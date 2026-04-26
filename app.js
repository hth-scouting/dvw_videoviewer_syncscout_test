// ==========================================
// Sync Scout - アプリケーションロジック (前半)
// ==========================================

// --- 1. Supabase 設定 & 認証 (チーム隔離) ---
const SUPABASE_URL = 'https://ciokifeakrkigonhwbyf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpb2tpZmVha3JraWdvbmh3YnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5ODQxNjgsImV4cCI6MjA5MDU2MDE2OH0.NYqH52Rl7Gn9SKeF3mnDioEphpoKpCDrxv6NifU69Po';

let MY_TEAM_CODE = localStorage.getItem('courtend_team_code');
let MY_TEAM_NAME = localStorage.getItem('courtend_team_name');
let supabaseClient;

function isLicenceExpired(licenceEndDate) {
    if (!licenceEndDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today > new Date(licenceEndDate);
}

async function checkAuth() {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedKey = urlParams.get('key');

    const tempClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    if (sharedKey) {
        const { data, error } = await tempClient.from('teams').select('passcode, team_name, licence_end_date').eq('passcode', sharedKey).single();
        if (data && !error) {
            if (isLicenceExpired(data.licence_end_date)) {
                return authFailed("ライセンスの有効期限が切れています。\n管理者にお問い合わせください。");
            }
            localStorage.setItem('courtend_team_code', sharedKey);
            localStorage.setItem('courtend_team_name', data.team_name);
            MY_TEAM_CODE = sharedKey;
            MY_TEAM_NAME = data.team_name;

            urlParams.delete('key');
            const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
            window.history.replaceState({}, '', newUrl);
        } else {
            alert("リンクの合言葉が無効です。手動でログインしてください。");
        }
    }

    if (!MY_TEAM_CODE || !MY_TEAM_NAME) {
        const input = prompt("チーム専用の合言葉を入力してください");
        if (!input) return authFailed("閲覧には合言葉が必要です。");

        const { data, error } = await tempClient.from('teams').select('passcode, team_name, licence_end_date').eq('passcode', input.trim()).single();
        if (error || !data) return authFailed("無効な合言葉です。");

        if (isLicenceExpired(data.licence_end_date)) {
            return authFailed("ライセンスの有効期限が切れています。\n管理者にお問い合わせください。");
        }

        localStorage.setItem('courtend_team_code', input.trim());
        localStorage.setItem('courtend_team_name', data.team_name);
        MY_TEAM_CODE = input.trim();
        MY_TEAM_NAME = data.team_name;
    }

    // キャッシュログイン時も期限チェック
    if (MY_TEAM_CODE) {
        const { data: teamData } = await tempClient.from('teams').select('licence_end_date').eq('passcode', MY_TEAM_CODE).single();
        if (teamData && isLicenceExpired(teamData.licence_end_date)) {
            return authFailed("ライセンスの有効期限が切れています。\n管理者にお問い合わせください。");
        }
    }

    const badge = document.getElementById('team-badge');
    if (badge) {
        badge.innerText = MY_TEAM_NAME;
        badge.style.display = 'inline-flex';
    }

    // ★ DBの準備が完全に完了！
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: { headers: { 'x-team-code': MY_TEAM_CODE } }
    });
    
    // ★ ここで初めてYouTubeを読み込む（フライングエラー回避！）
    if (window.YT && window.YT.Player) {
        onYouTubeIframeAPIReady();
    } else {
        const tag = document.createElement('script'); 
        tag.src = "https://www.youtube.com/iframe_api"; 
        document.head.appendChild(tag);
    }
}

function authFailed(msg) {
    alert(msg); 
    localStorage.removeItem('courtend_team_code'); 
    localStorage.removeItem('courtend_team_name');
    document.body.innerHTML = `<div style="padding:20px; text-align:center;"><h2>Access Denied</h2><p>${msg}</p><button class="action-btn" onclick="location.reload()">再入力</button></div>`;
}

function logout() {
    if(confirm("ログアウトしますか？")) { 
        localStorage.removeItem('courtend_team_code'); 
        localStorage.removeItem('courtend_team_name');
        location.reload(); 
    }
}

// --- 2. グローバル変数 & YouTube 初期化 ---
function getSafeURLParams() {
    const params = new URLSearchParams(window.location.search);
    let q = params.get('q'); 
    let ids = params.get('ids');
    const href = window.location.href;

    // ★ LINEなどのアプリ内ブラウザがURLを破壊した場合の強力な救済措置
    if (!ids && href.includes('ids=')) {
        ids = href.split('ids=')[1].split('&')[0];
    }
    if (!q) {
        if (href.includes('q=#')) q = '#' + href.split('q=#')[1].split('&')[0];
        else if (href.includes('q=%23')) q = '#' + href.split('q=%23')[1].split('&')[0];
    }
    
    // matchも同様に救済
    const matchParam = params.get('match') || (href.includes('match=') ? href.split('match=')[1].split('&')[0] : null);

    return { 
        match: matchParam, 
        t: params.get('t'), 
        q: q ? decodeURIComponent(q) : null, 
        ids: ids ? decodeURIComponent(ids) : null 
    };
}
const urlParams = getSafeURLParams();
// ★ ids: urlParams.ids を追加
window.initLinkData = { t: urlParams.t, q: urlParams.q, match: urlParams.match, ids: urlParams.ids };

let player, allPlays = [], rallies = [], matchMap = {}, playerMaster = {}, allMatchData = [], currentData = [];
let currentMode = 'rally', currentIndex = -1, checkInterval;
let currentMatchDVW = "", currentCategory = "All", matchComments = {}, matchLikes = {}, matchDrawings = {}, likedPlaysSession = new Set();
const starterTags = ["#MB","#OH","#OP","#S","#L","#Good","#Bad","#System","#Transition","#BlockDefense","#Check"];

function escapeHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function jsAttr(val) {
    return JSON.stringify(String(val)).replace(/"/g, '&quot;');
}

function onYouTubeIframeAPIReady() { 
    player = new YT.Player('player', { 
        height:'100%', width:'100%', 
        playerVars:{'playsinline':1,'rel':0,'modestbranding':1}, 
        events:{ 'onReady': () => { initTelestrator(); fetchMatchList(); }, 'onStateChange': onPlayerStateChange }
    }); 
}

function onPlayerStateChange(e) { 
    const autoNextCb = document.getElementById('autoNext');
    if (e.data == 1 && autoNextCb && autoNextCb.checked) startTracking(); 
    else clearInterval(checkInterval); 
}

function startTracking() { 
    clearInterval(checkInterval); 
    checkInterval = setInterval(() => { 
        if (currentIndex >= 0 && currentData[currentIndex]) { 
            const now = player.getCurrentTime(), d = currentData[currentIndex]; 
            let limit = (currentMode === 'player') ? d.endTime : (d.rallyEndTime || (d.startTime + 7.0)); 
            if (now > limit && currentIndex < currentData.length - 1) playNext(); 
        } 
    }, 500); 
}


// --- 3. データ取得・保存 (チーム隔離対応) ---
function fetchMatchList() {
    supabaseClient.from('matches').select('*').order('created_at', { ascending: false })
    .then(dbRes => {
        allMatchData = []; let cats = new Set(["All"]);
        if(dbRes.error) {
            console.error("Match fetch error:", dbRes.error);
            document.getElementById('instanceList').innerHTML = `<div class="empty-msg">Error: ${dbRes.error.message}</div>`;
            return;
        }
        if(dbRes.data && dbRes.data.length > 0) {
            dbRes.data.forEach(m => { allMatchData.push({ cat: m.category, dvw: m.dvw_url, vid: m.youtube_id, display_name: m.dvw_filename }); cats.add(m.category); });
        }
        renderCategoryTabs(Array.from(cats)); updateMatchDropdown();
        
        const mParam = window.initLinkData.match || urlParams.match;
        if (mParam && matchMap[mParam]) { document.getElementById('matchSelect').value = mParam; onMatchChange(mParam); } 
        else if (allMatchData.length > 0) { onMatchChange(allMatchData[0].dvw); document.getElementById('matchSelect').value = allMatchData[0].dvw; }
        else { document.getElementById('instanceList').innerHTML = '<div class="empty-msg">このチームにはまだ試合データがありません。<br>「+ Add Match」から追加してください。</div>'; }
    });
}

function renderCategoryTabs(cats) {
    const div = document.getElementById('catTabs'); if(!div) return; div.innerHTML = '';
    if (cats.length <= 1) div.innerHTML = '<span class="empty-msg">No Categories</span>';
    cats.forEach(c => {
        const btn = document.createElement('div'); btn.className = `cat-tab ${c === currentCategory ? 'active' : ''}`;
        btn.innerText = c; btn.onclick = () => { currentCategory = c; renderCategoryTabs(cats); updateMatchDropdown(); };
        div.appendChild(btn);
    });

    const mob = document.getElementById('catSelectMobile'); if(!mob) return;
    mob.innerHTML = '';
    cats.forEach(c => {
        const opt = new Option(c, c); if(c === currentCategory) opt.selected = true;
        mob.appendChild(opt);
    });
}

function changeCategoryMobile(val) {
    currentCategory = val;
    const cats = Array.from(document.querySelectorAll('#catTabs .cat-tab')).map(b => b.innerText);
    renderCategoryTabs(cats.length ? cats : [val]);
    updateMatchDropdown();
}

function updateMatchDropdown() {
    const select = document.getElementById('matchSelect'); if(!select) return;
    select.innerHTML = '<option value="">Select Match...</option>'; matchMap = {};
    const filtered = allMatchData.filter(m => currentCategory === "All" || m.cat === currentCategory);
    if(filtered.length === 0) { select.innerHTML = '<option value="">No matches</option>'; select.disabled = true; } 
    else { select.disabled = false; filtered.forEach(m => { matchMap[m.dvw] = m.vid; let name = m.display_name ? m.display_name : m.dvw.split('/').pop().replace('.dvw',''); select.add(new Option(name, m.dvw)); }); }
}

function toggleShortcuts() {
    const modal = document.getElementById('shortcut-modal');
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
    }
}

async function submitNewMatch() {
    const cat = document.getElementById('am-cat').value.trim();
    const ytUrl = document.getElementById('am-yt').value.trim();
    const fileInput = document.getElementById('am-file');
    
    if(!cat || !ytUrl || !fileInput.files.length) return alert("全て入力してください");
    
    let ytId = ytUrl; 
    if(ytUrl.includes('v=')) ytId = ytUrl.split('v=')[1].split('&')[0]; 
    else if(ytUrl.includes('youtu.be/')) ytId = ytUrl.split('youtu.be/')[1].split('?')[0];

    const file = fileInput.files[0];
    const fileName = Date.now() + "_" + file.name;
    const btn = document.getElementById('am-submit-btn'); 
    btn.innerText = "Uploading..."; btn.disabled = true;

    try {
        const { error: uploadError } = await supabaseClient.storage.from('dvw_files').upload(fileName, file);
        if (uploadError) throw new Error("Storage Upload Error: " + uploadError.message);

        const { data: urlData } = supabaseClient.storage.from('dvw_files').getPublicUrl(fileName);

        // ★ team_codeを含めて保存
        const { error: dbError } = await supabaseClient.from('matches').insert([{ 
            category: cat, 
            dvw_filename: file.name, 
            dvw_url: urlData.publicUrl, 
            youtube_id: ytId, 
            team_code: MY_TEAM_CODE 
        }]);
        if(dbError) throw new Error("DB Insert Error: " + dbError.message);

        alert("追加成功しました！");
        document.getElementById('add-match-modal').style.display = 'none'; 
        document.getElementById('am-cat').value = ''; 
        document.getElementById('am-yt').value = ''; 
        document.getElementById('am-file').value = ''; 
        fetchMatchList(); 
    } catch(e) { 
        console.error(e); alert("追加に失敗しました。\n\n詳細: " + e.message); 
    } finally { 
        btn.innerText = "Upload & Save"; btn.disabled = false; 
    }
}

function onMatchChange(dvw) {
    const delBtn = document.getElementById('delete-match-btn');
    if (!dvw || !matchMap[dvw]) { if(delBtn) delBtn.style.display = 'none'; return; }
    if(delBtn) delBtn.style.display = 'inline-flex';
    currentMatchDVW = dvw; player.loadVideoById(matchMap[dvw]);
    document.getElementById('instanceList').innerHTML = '<div class="empty-msg">Analyzing file...</div>';
    fetch(dvw).then(res => res.text()).then(parseDVW).catch(e => {
        document.getElementById('instanceList').innerHTML = '<div class="empty-msg">File load error.</div>';
    }); 
}

// --- 4. 解析 (parseDVW) & UI連携 ---
async function parseDVW(text) {
    allPlays = []; rallies = []; playerMaster = {}; const lines = text.split('\n'); 
    let currentSection = "", runningScore = "00-00", hSets = 0, aSets = 0, teamCount = 0, tempRally = null;
    let currentHomeRot = null, currentAwayRot = null, pointCodeCount = 0;

    lines.forEach(line => {
        const l = line.trim(); if (l.startsWith('[')) { currentSection = l; return; }
        if (currentSection === "[3TEAMS]") { 
            const p = l.split(';'); if (p.length < 2) return; 
            if (teamCount === 0) { document.getElementById('ov-h-code').innerText = p[0]; teamCount++; } else { document.getElementById('ov-a-code').innerText = p[0]; } 
        }
        if (currentSection === "[3PLAYERS-H]" || currentSection === "[3PLAYERS-V]") { 
            const p = l.split(';'); const side = currentSection.includes('-H') ? '*' : 'a'; const num = parseInt(p[1]); 
            if (!isNaN(num)) playerMaster[`${side}_${num}`] = { name: (p[9] || p[10] || `Player ${num}`).trim(), num }; 
        }
        if (currentSection === "[3SCOUT]") {
            const c = l.split(';'); const code = c[0]; if (!code) return;
            if (code.startsWith('**') && code.toLowerCase().includes('set')) { 
                const last = runningScore.split('-').map(Number); if (last[0] > last[1]) hSets++; else if (last[1] > last[0]) aSets++; runningScore = "00-00"; return; 
            }
            if (code.toLowerCase().match(/^[a-z\*]p/)) { 
                const m = code.match(/(\d{1,2})[:.](\d{1,2})/); 
                if (m) {
                    const oldH = parseInt(runningScore.split('-')[0]) || 0, oldA = parseInt(runningScore.split('-')[1]) || 0;
                    const newH = parseInt(m[1]) || 0, newA = parseInt(m[2]) || 0;
                    runningScore = `${m[1].padStart(2,'0')}-${m[2].padStart(2,'0')}`; 
                    if (tempRally) { 
                        const t12 = parseFloat(c[12]); tempRally.rallyEndTime = isNaN(t12) ? (tempRally.startTime + 7.0) : t12;
                        if (newH > oldH) tempRally.wonBy = '*'; else if (newA > oldA) tempRally.wonBy = 'a'; else tempRally.wonBy = code.toLowerCase().startsWith('*') ? '*' : 'a'; 
                    } pointCodeCount++;
                } return; 
            }
            const skillChar = code.charAt(3); 
            if ("SRABDE".includes(skillChar)) {
                const side = code.charAt(0), num = parseInt(code.substring(1,3)), time = parseFloat(c[12]), p = playerMaster[`${side}_${num}`] || { name: `Player ${num}`, num };
                let rH = parseInt(c[9]); if (!isNaN(rH)) currentHomeRot = rH; else rH = currentHomeRot;
                let rA = parseInt(c[10]); if (!isNaN(rA)) currentAwayRot = rA; else rA = currentAwayRot;
                const playObj = { id: allPlays.length, time, startTime: time - 2.0, endTime: time + 5.0, score: runningScore, setNum: hSets+aSets+1, hSets, aSets, side, skill: skillChar, effect: code.charAt(5), pName: p.name, pNum: p.num, rot: (side === '*' ? rH : rA) || "?", rallyHomeRot: rH, rallyAwayRot: rA };
                if (skillChar === 'S') { tempRally = playObj; rallies.push(playObj); } else if (tempRally) { playObj.rallyHomeRot = tempRally.rallyHomeRot; playObj.rallyAwayRot = tempRally.rallyAwayRot; }
                allPlays.push(playObj);
            }
        }
    });
    
    const autoNextEl = document.getElementById('autoNext');
    if(autoNextEl) autoNextEl.checked = (pointCodeCount > 0);
    
updateFilters(); await loadCloudData(); 

    // ★ 変更：スマホアプリ内ブラウザ対策（保護された初期データから確実に読み取る）
    let urlIds = window.initLinkData.ids;
    let urlQ = window.initLinkData.q;
    const urlT = window.initLinkData.t;

    if (!window.hasAppliedSharedLink) {
        window.hasAppliedSharedLink = true;

        if (urlIds) {
            document.getElementById('searchFilter').value = 'ids:' + urlIds;
            document.getElementById('searchArea').classList.add('show');
        } else if (urlQ) {
            document.getElementById('searchFilter').value = urlQ;
            document.getElementById('searchArea').classList.add('show');
        }

        render(); // ここでリストが絞り込まれる

        // モバイルの読み込み遅延に配慮して1.5秒待ってから再生
        if (urlT) {
            setTimeout(() => {
                const t = parseFloat(urlT); let targetIdx = 0, minDiff = Infinity;
                currentData.forEach((d,i) => { let diff = Math.abs(d.startTime - t); if (diff < minDiff) { minDiff = diff; targetIdx = i; } });
                if(currentData[targetIdx]) {
                    playIndex(targetIdx); 
                    document.getElementById(`actions-${currentData[targetIdx].id}`)?.classList.add('show');
                }
            }, 1500); 
        } else if ((urlQ || urlIds) && currentData.length > 0) {
            setTimeout(() => { playIndex(0); }, 1500);
        }
    } else {
        render();
    }
} // ← parseDVW の終わりのカッコ// ← parseDVW の終わりのカッコ

async function loadCloudData() {
    const [cRes, lRes, dRes] = await Promise.all([
        // ★ .eq('team_code', MY_TEAM_CODE) を追加してチームを隔離
        supabaseClient.from('comments').select('*').eq('match_dvw', currentMatchDVW).eq('team_code', MY_TEAM_CODE),
        supabaseClient.from('likes').select('play_id').eq('match_dvw', currentMatchDVW).eq('team_code', MY_TEAM_CODE),
        supabaseClient.from('drawings').select('*').eq('match_dvw', currentMatchDVW).eq('team_code', MY_TEAM_CODE).order('created_at', { ascending: false })
    ]);
    matchComments = {}; (cRes.data || []).forEach(r => { if (!matchComments[r.play_id]) matchComments[r.play_id] = []; matchComments[r.play_id].push(r.comment_text); });
    matchLikes = {}; (lRes.data || []).forEach(r => matchLikes[r.play_id] = (matchLikes[r.play_id] || 0) + 1);
    matchDrawings = {}; (dRes.data || []).forEach(r => { if (!matchDrawings[r.play_id]) { try { matchDrawings[r.play_id] = JSON.parse(r.drawing_data); } catch(e){} } });
}

function updateFilters() {
    const h = document.getElementById('ov-h-code').innerText, a = document.getElementById('ov-a-code').innerText;
    document.getElementById('teamFilterRally').innerHTML = `<option value="">Both Teams</option><option value="*">${h} Serves</option><option value="a">${a} Serves</option>`;
    document.getElementById('teamFilterPlayer').innerHTML = `<option value="">Team</option><option value="*">${h}</option><option value="a">${a}</option>`;
    document.getElementById('score-overlay').style.display = 'flex';
}
function onTeamChangePlayer() {
    const team = document.getElementById('teamFilterPlayer').value, ps = document.getElementById('playerFilter'); ps.innerHTML = '<option value="">Player</option>'; if (!team) return;
    const seen = new Set(); allPlays.filter(p => p.side === team).forEach(p => { if (!seen.has(p.pName)) { ps.add(new Option(`#${p.pNum} ${p.pName}`, p.pName)); seen.add(p.pName); } }); render();
}
function setMode(m) { 
    currentMode = m; document.querySelectorAll('.mode-tab').forEach(b => b.classList.remove('active')); if(document.getElementById('btn-' + m)) document.getElementById('btn-' + m).classList.add('active'); 
    document.getElementById('filterArea').style.display = (m === 'stats' || m === 'rotation') ? 'none' : 'block'; 
    document.getElementById('rally-filters').style.display = (m === 'rally') ? 'flex' : 'none'; 
    document.getElementById('player-filters').style.display = (m === 'player') ? 'flex' : 'none'; 
    render(); 
}
function toggleSearchArea() {
    document.getElementById('searchArea').classList.toggle('show');
}

// ========== 前半終了 ==========
// ==========================================
// 5. フルレンダー (リスト、スタッツ、ローテ)
// ==========================================
function render() {
    const list = document.getElementById('instanceList'); 
    if(!list) return;
    list.innerHTML = ''; 
    
    if (currentMode === 'stats') { renderDualTables(); return; }
    if (currentMode === 'rotation') { renderRotationTables(); return; } 
    
let data = []; 
    const q = document.getElementById('searchFilter').value.toLowerCase().trim();

    if (q.startsWith('rot:')) {
        const p = q.split(','); const tSide = p[0].replace('rot:', '').trim(), phase = p[1], rot = parseInt(p[2]); 
        if (phase === 'so') data = rallies.filter(d => d.side === (tSide === '*' ? 'a' : '*') && (tSide === '*' ? d.rallyHomeRot : d.rallyAwayRot) === rot);
        else if (phase === 'bp') data = rallies.filter(d => d.side === tSide && (tSide === '*' ? d.rallyHomeRot : d.rallyAwayRot) === rot);
        
    // ★ ここが重要：プレイリスト（ids）の処理
    } else if (q.startsWith('ids:')) { 
        const idArray = q.replace('ids:', '').split(',').map(Number);
        data = allPlays.filter(d => idArray.includes(d.id));
        
    } else if (q.startsWith('id:')) { 
        data = allPlays.filter(d => d.id === parseInt(q.replace('id:', '').trim())); 
        
    // ★ クエリ（#MBなど）の処理
    } else if (q) { 
        data = allPlays.filter(d => `${d.pName} ${d.skill} ${(matchComments[d.id]||[]).join(' ')}`.toLowerCase().includes(q)); 
    } else {
        // ... 通常のモードごとの処理が続く
        if (currentMode === 'rally') { 
            data = rallies; const t = document.getElementById('teamFilterRally').value; if(t) data = data.filter(d => d.side === t); 
        } else { 
            data = allPlays; const t = document.getElementById('teamFilterPlayer').value; 
            if (!t) { list.innerHTML = '<div class="empty-msg">Please select a team to view player stats</div>'; return; } 
            const pF = document.getElementById('playerFilter').value, sF = document.getElementById('skillFilter').value, eF = document.getElementById('effectFilter').value; 
            data = data.filter(d => d.side === t && (!pF || d.pName === pF) && (!sF || d.skill === sF) && (!eF || d.effect === eF)); 
        }
    }
    
    currentData = data; 
    if (currentData.length === 0) { list.innerHTML = `<div class="empty-msg">No plays found.</div>`; return; }

    let lastSet = -1;
    currentData.forEach((d, i) => {
        if (d.setNum !== lastSet) { 
            list.innerHTML += `<div class="stats-section-title">SET ${d.setNum}</div>`; 
            lastSet = d.setNum; 
        }
        
        const likes = matchLikes[d.id] || 0;
        const liked = likedPlaysSession.has(d.id) ? 'style="color:#d32f2f; border-color:#d32f2f;"' : '';
        const btn = document.createElement('div'); 
        btn.className = `instance-btn`; 
        btn.id = 'idx-'+i;
        
        if (d.side === '*') btn.style.borderLeft = '4px solid #1976d2';
        else if (d.side === 'a') btn.style.borderLeft = '4px solid #d32f2f';
        
        const cHTML = (matchComments[d.id] || []).map((c, cidx) => `<div class="comment-item"><span>・${escapeHtml(c)}</span><span class="del-comment" onclick="event.stopPropagation(); deleteComment(${d.id}, ${cidx})">✖</span></div>`).join('');
        const hasDraw = (matchDrawings[d.id] && matchDrawings[d.id].length > 0) ? 'style="background:#ffebee; color:#d32f2f; font-weight:bold;"' : '';
        const cCount = (matchComments[d.id] || []).length;
        const noteBtnStyle = cCount > 0 ? `style="background:#e3f2fd; color:#1976d2; font-weight:bold;"` : '';

        btn.innerHTML = `
            <div class="card-main" onclick="playIndex(${i})">
                <div class="score-box">${escapeHtml(d.score)}</div>
                <div style="flex:1; line-height:1.2; font-size:0.9rem;">
                    <strong>#${escapeHtml(d.pNum)} ${escapeHtml(d.pName.split(' ')[0])}</strong><br>
                    <span style="color:#666; font-size:0.8rem;">P${escapeHtml(d.rot)} | ${escapeHtml(d.skill)}${escapeHtml(d.effect)}</span>
                </div>
            </div>
            <div class="top-right-actions">
                <button class="action-sm-btn" ${liked} onclick="event.stopPropagation(); addLike(${d.id})">👍 ${likes}</button>
                <button class="action-sm-btn" ${hasDraw} onclick="event.stopPropagation(); enterDrawMode(${d.id})">✏️ Draw</button>
                <button class="action-sm-btn" ${noteBtnStyle} onclick="toggleActions(event, ${i})">💬 Note ${cCount ? `(${cCount})` : ''}</button>
            </div>
            <div class="card-actions" id="actions-${i}">
                <div id="c-disp-${d.id}">${cHTML}</div>
                <div class="action-row">
                    <div class="tag-popup" id="tags-${d.id}">${starterTags.map(t => `<div class="tag-chip" onclick="applyTag(${d.id}, '${t}')">${t}</div>`).join('')}</div>
                    <button class="tag-trigger" onclick="event.stopPropagation(); toggleTagPopup(${d.id})">#</button>
                    <div style="flex:1; position:relative;">
                      <input type="text" class="comment-input" id="c-input-${d.id}" placeholder="Note..." autocomplete="off" oninput="handleSuggestInput(event, ${d.id})" onclick="event.stopPropagation()" onkeydown="if(event.key === 'Enter'){ event.preventDefault(); event.stopPropagation(); addComment(${d.id}); }"> 
                        <div class="auto-suggest-box" id="suggest-${d.id}"></div>
                    </div>
                    <button class="action-btn add-btn" onclick="event.stopPropagation(); addComment(${d.id})">Send</button>
                </div>
                <div class="action-row" style="margin-top: 5px;">
                    <button class="action-btn copy-link-btn" onclick="event.stopPropagation(); copyPlayLink(${i})">🔗 Copy Link</button>
                    <button class="action-btn line-btn" onclick="event.stopPropagation(); sendLine(${i})">🟢 Send LINE</button>
                </div>
            </div>`;
        list.appendChild(btn);
    });
}

// 統計 & ローテ表
function renderDualTables() { 
    const list = document.getElementById('instanceList'); list.innerHTML = ''; 
    ["*", "a"].forEach(side => { 
        const team = side === "*" ? document.getElementById('ov-h-code').innerText : document.getElementById('ov-a-code').innerText; 
        list.innerHTML += `<div class="stats-section-title">${team} Stats</div><div class="stats-container"><table class="stats-table" id="t-${side}"></table></div>`; 
        buildTable(side, `t-${side}`); 
    }); 
}

function buildTable(side, targetId) {
    const ps = []; const seen = new Set(); 
    
    allPlays.filter(p => p.side === side).forEach(p => { 
        // ★ ここで弾く！背番号がない・数字じゃない場合は無視して次へ
        if (!p.pNum || isNaN(parseInt(p.pNum)) || p.pNum === "undefined" || p.pNum === "NaN") return;

        if (!seen.has(p.pName)) { 
            ps.push({ name: p.pName, num: parseInt(p.pNum) }); 
            seen.add(p.pName); 
        } 
    }); 
    
    ps.sort((a,b) => a.num - b.num);

    let html = `<tr><th rowspan="2">Player</th><th colspan="3">Serve</th><th colspan="4">Rec</th><th colspan="4">Attack</th></tr><tr><th>Tot</th><th>Ace</th><th>Err</th><th>Tot</th><th>Err</th><th>#+%</th><th>#%</th><th>Tot</th><th>Kill</th><th>Err</th><th>%</th></tr>`;
    
    ps.forEach(p => {
        const pl = allPlays.filter(play => play.pName === p.name && play.side === side), s = pl.filter(d => d.skill === 'S'), r = pl.filter(d => d.skill === 'R'), a = pl.filter(d => d.skill === 'A');
        const sAce = s.filter(d => d.effect === '#').length, sErr = s.filter(d => d.effect === '=').length;
        const rErr = r.filter(d => d.effect === '=').length, rPerf = r.filter(d => d.effect === '#').length, rPos = r.filter(d => d.effect === '+').length;
        const aKill = a.filter(d => d.effect === '#').length, aLoss = a.filter(d => d.effect === '=' || d.effect === '/').length;
        const esc = jsAttr(p.name);

        html += `<tr>
            <td style="text-align:left;">#${p.num} ${escapeHtml(p.name.split(' ')[0])}</td>
            <td><span class="click-num" onclick="jumpToStat('${side}',${esc},'S','')">${s.length}</span></td><td>${sAce}</td><td>${sErr}</td>
            <td><span class="click-num" onclick="jumpToStat('${side}',${esc},'R','')">${r.length}</span></td><td>${rErr}</td><td>${r.length?Math.round((rPerf+rPos)/r.length*100):0}%</td><td>${r.length?Math.round(rPerf/r.length*100):0}%</td>
            <td><span class="click-num" onclick="jumpToStat('${side}',${esc},'A','')">${a.length}</span></td><td>${aKill}</td><td>${aLoss}</td><td>${a.length?((aKill/a.length)*100).toFixed(1):'0'}%</td>
        </tr>`;
    }); 
    document.getElementById(targetId).innerHTML = html;
}

function renderRotationTables() { 
    const list = document.getElementById('instanceList'); list.innerHTML = ''; 
    ["*", "a"].forEach(side => { 
        const team = side === "*" ? document.getElementById('ov-h-code').innerText : document.getElementById('ov-a-code').innerText; 
        list.innerHTML += `<div class="stats-section-title">${team} Rotation</div><div class="stats-container"><table class="stats-table" id="t-rot-${side}"></table></div>`; 
        buildRotationTable(side, `t-rot-${side}`); 
    }); 
}

function buildRotationTable(side, targetId) {
    let html = `<tr><th rowspan="2">Rot</th><th colspan="3">Side Out Phase</th><th colspan="5">Break Phase</th></tr><tr><th>Tot</th><th>Won</th><th>SO %</th><th>Tot</th><th>Ace</th><th>Err</th><th>Won</th><th>BP %</th></tr>`;
    [1, 6, 5, 4, 3, 2].forEach(r => {
        const oppSide = side === '*' ? 'a' : '*'; 
        const soRallies = rallies.filter(d => d.side === oppSide && (side === '*' ? d.rallyHomeRot : d.rallyAwayRot) === r);
        const soTot = soRallies.length, soWon = soRallies.filter(d => d.wonBy === side).length, soPct = soTot ? Math.round((soWon / soTot) * 100) : 0;
        const soColor = soPct >= 65 ? '#d32f2f' : (soPct < 50 ? '#1976d2' : '#333');
        
        const bpRallies = rallies.filter(d => d.side === side && (side === '*' ? d.rallyHomeRot : d.rallyAwayRot) === r);
        const bpTot = bpRallies.length, bpAce = bpRallies.filter(d => d.effect === '#').length, bpErr = bpRallies.filter(d => d.effect === '=').length;
        const bpWon = bpRallies.filter(d => d.wonBy === side).length, bpPct = bpTot ? Math.round((bpWon / bpTot) * 100) : 0;
        const bpColor = bpPct >= 40 ? '#d32f2f' : (bpPct < 25 ? '#1976d2' : '#333');
        
        html += `<tr>
            <td style="font-weight:bold; background:#e3f2fd; color:#1976d2;">P${r}</td>
            <td><span class="click-num" onclick="jumpToRotationRallies('${side}', ${r}, 'so')">${soTot}</span></td><td>${soWon}</td><td style="font-weight:bold; color:${soColor}">${soPct}%</td>
            <td><span class="click-num" onclick="jumpToRotationRallies('${side}', ${r}, 'bp')">${bpTot}</span></td><td>${bpAce}</td><td>${bpErr}</td><td>${bpWon}</td><td style="font-weight:bold; color:${bpColor}">${bpPct}%</td>
        </tr>`;
    }); 
    document.getElementById(targetId).innerHTML = html;
}

// 補助機能
function jumpToStat(side, pName, skill, eff) { 
    document.getElementById('searchFilter').value = ''; 
    document.getElementById('searchArea').style.display = 'none'; 
    setMode('player'); 
    document.getElementById('teamFilterPlayer').value = side; onTeamChangePlayer(); 
    document.getElementById('playerFilter').value = pName; 
    document.getElementById('skillFilter').value = skill; 
    document.getElementById('effectFilter').value = eff; 
    render(); 
    if (currentData.length > 0) playIndex(0); 
}

function jumpToRotationRallies(side, rNum, phase) {
    document.getElementById('searchFilter').value = `rot:${side},${phase},${rNum}`;
    document.getElementById('searchArea').classList.add('show');
    setMode('rally');
    if(currentData.length > 0) playIndex(0);
}

// ==========================================
// 6. DB連携 & アクション (チーム隔離)
// ==========================================
async function addComment(playId) { 
    const input = document.getElementById(`c-input-${playId}`);
    const text = input.value.trim(); 
    if (!text) return; 
    
    if (!matchComments[playId]) matchComments[playId] = []; 
    matchComments[playId].push(text); 
    input.value = ""; 
    render(); 
    
    // ★ team_code付きで保存
    await supabaseClient.from('comments').insert([{ match_dvw: currentMatchDVW, play_id: playId, comment_text: text, team_code: MY_TEAM_CODE }]); 
}

async function deleteComment(playId, idx) {
    if(!confirm("削除しますか？")) return;
    const text = (matchComments[playId] || [])[idx];
    if (text === undefined) return;
    matchComments[playId].splice(idx, 1);
    render();

    // ★ team_code付きで削除
    await supabaseClient.from('comments').delete().match({ match_dvw: currentMatchDVW, play_id: playId, comment_text: text, team_code: MY_TEAM_CODE });
}

async function addLike(playId) { 
    if (likedPlaysSession.has(playId)) return; 
    likedPlaysSession.add(playId); 
    matchLikes[playId] = (matchLikes[playId] || 0) + 1; 
    render(); 
    
    // ★ team_code付きで保存
    await supabaseClient.from('likes').insert([{ match_dvw: currentMatchDVW, play_id: playId, team_code: MY_TEAM_CODE }]); 
}

function toggleActions(event, index, forceShow = false) { 
    if(event) event.stopPropagation(); 
    const div = document.getElementById(`actions-${index}`); 
    if(div) { 
        if(forceShow) div.classList.add('show'); 
        else div.classList.toggle('show'); 
    } 
}

function handleSuggestInput(e, playId) {
    const val = e.target.value, cursorStart = e.target.selectionStart, words = val.substring(0, cursorStart).split(/\s+/), currentWord = words[words.length - 1], suggestBox = document.getElementById(`suggest-${playId}`);
    if (currentWord.length > 0) { 
        const searchStr = currentWord.replace(/^#/, '').toLowerCase(), matches = starterTags.filter(t => t.toLowerCase().includes(searchStr) || t.toLowerCase().replace(/^#/, '').includes(searchStr)); 
        if (matches.length > 0) { 
            suggestBox.innerHTML = matches.map((m, idx) => `<div class="s-item ${idx === 0 ? 'active' : ''}" onclick="event.stopPropagation(); selectSuggest(${playId}, '${m}')">${m}</div>`).join(''); 
            suggestBox.style.display = 'block'; 
            suggestBox.dataset.activeIdx = 0; 
            suggestBox.dataset.word = currentWord; 
            return; 
        } 
    } 
    suggestBox.style.display = 'none';
}

function selectSuggest(playId, tag) { 
    const input = document.getElementById(`c-input-${playId}`), suggestBox = document.getElementById(`suggest-${playId}`), currentWord = suggestBox.dataset.word;
    const val = input.value, cursorStart = input.selectionStart, textBeforeCursor = val.substring(0, cursorStart), textAfterCursor = val.substring(cursorStart);
    const newTextBefore = textBeforeCursor.substring(0, textBeforeCursor.length - currentWord.length) + tag + ' '; 
    input.value = newTextBefore + textAfterCursor; 
    input.focus(); 
    input.selectionStart = input.selectionEnd = newTextBefore.length; 
    suggestBox.style.display = 'none'; 
}

function toggleTagPopup(playId) { 
    const show = document.getElementById(`tags-${playId}`).classList.contains('show'); 
    document.querySelectorAll('.tag-popup').forEach(p => p.classList.remove('show')); 
    if(!show) document.getElementById(`tags-${playId}`).classList.add('show'); 
}

function applyTag(playId, tag) { 
    const input = document.getElementById(`c-input-${playId}`); 
    input.value = (input.value.trim() + " " + tag).trim() + " "; 
    input.focus(); 
    document.querySelectorAll('.tag-popup').forEach(p => p.classList.remove('show')); 
}

function playIndex(i) { 
    if (i < 0 || i >= currentData.length) return; 
    currentIndex = i; 
    const d = currentData[i]; 
    player.seekTo(d.startTime, true); 
    player.playVideo(); 
    
    document.getElementById('ov-h-sets').innerText = d.hSets; 
    document.getElementById('ov-a-sets').innerText = d.aSets; 
    const s = d.score.split('-'); 
    document.getElementById('ov-h-score').innerText = parseInt(s[0]) || 0; 
    document.getElementById('ov-a-score').innerText = parseInt(s[1]) || 0; 
    
    resizeCanvas(); 
    if (matchDrawings[d.id]) { drawingLines = matchDrawings[d.id]; renderDrawing(); } 
    else { ctx.clearRect(0,0,canvas.width,canvas.height); } 
    
    document.querySelectorAll('.instance-btn').forEach(b => b.classList.remove('active')); 
    document.getElementById('idx-' + i)?.classList.add('active'); 
    document.getElementById('idx-' + i)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); 
}

function playNext() { if (currentIndex < currentData.length - 1) playIndex(currentIndex + 1); }
function playPrev() { if (currentIndex > 0) playIndex(currentIndex - 1); }
function seekSeconds(s) { if (player && player.getCurrentTime) player.seekTo(player.getCurrentTime() + s, true); }

// ==========================================
// 7. お絵かき (Telestrator)
// ==========================================
const canvas = document.getElementById('telestratorCanvas'), ctx = canvas ? canvas.getContext('2d') : null;
let isDrawingMode = false, isDrawing = false, drawingLines = [], activePlayIdForDraw = null, currentDrawTool = 'freehand', currentShape = null, currentPath = [];

function setDrawTool(tool) { 
    currentDrawTool = tool; 
    document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active')); 
    document.getElementById('tool-' + tool).classList.add('active'); 
}

function initTelestrator() {
    if(!canvas) return;
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('touchstart', startDrawing, {passive:false});
    canvas.addEventListener('touchmove', draw, {passive:false});
    canvas.addEventListener('touchend', stopDrawing);

    // スワイプで±3秒シーク（描画モード中は無効）
    let swipeStartX = 0, swipeStartY = 0;
    const box = document.getElementById('player-box');
    box.addEventListener('touchstart', e => {
        if (isDrawingMode) return;
        swipeStartX = e.touches[0].clientX;
        swipeStartY = e.touches[0].clientY;
    }, { passive: true });
    box.addEventListener('touchend', e => {
        if (isDrawingMode) return;
        const dx = e.changedTouches[0].clientX - swipeStartX;
        const dy = e.changedTouches[0].clientY - swipeStartY;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            seekSeconds(dx > 0 ? 3 : -3);
            e.preventDefault();
        }
    }, { passive: false });
}

function resizeCanvas() { 
    const box = document.getElementById('player-box'); 
    if(!box || !canvas) return; 
    canvas.width = box.offsetWidth; 
    canvas.height = box.offsetHeight; 
    renderDrawing(); 
}

function getNormPos(e) { 
    const rect = canvas.getBoundingClientRect(); 
    let cX = e.clientX, cY = e.clientY; 
    if (e.touches && e.touches.length > 0) { cX = e.touches[0].clientX; cY = e.touches[0].clientY; } 
    return { x: (cX - rect.left) / canvas.width, y: (cY - rect.top) / canvas.height }; 
}

function startDrawing(e) { 
    if (!isDrawingMode) return; 
    e.preventDefault(); isDrawing = true; 
    const pos = getNormPos(e); 
    if (currentDrawTool === 'freehand') currentPath = [pos]; 
    else currentShape = { type: currentDrawTool, start: pos, end: pos }; 
}

function draw(e) { 
    if (!isDrawing || !isDrawingMode) return; 
    e.preventDefault(); 
    const pos = getNormPos(e); 
    if (currentDrawTool === 'freehand') currentPath.push(pos); 
    else currentShape.end = pos; 
    renderDrawing(); 
}

function stopDrawing() { 
    if (!isDrawing) return; 
    isDrawing = false; 
    if (currentDrawTool === 'freehand' && currentPath.length > 1) drawingLines.push(currentPath); 
    else if (currentShape && (currentShape.start.x !== currentShape.end.x || currentShape.start.y !== currentShape.end.y)) drawingLines.push(currentShape); 
    currentPath = []; currentShape = null; 
    renderDrawing(); 
}

function drawItem(ctx, item, w, h) {
    if (Array.isArray(item)) { 
        if (item.length < 2) return; 
        ctx.beginPath(); ctx.moveTo(item[0].x * w, item[0].y * h); 
        for (let i = 1; i < item.length; i++) ctx.lineTo(item[i].x * w, item[i].y * h); 
        ctx.stroke(); 
    } 
    else if (item.type === 'arrow') { 
        const hl = 15, dx = item.end.x * w - item.start.x * w, dy = item.end.y * h - item.start.y * h, angle = Math.atan2(dy, dx); 
        ctx.beginPath(); ctx.moveTo(item.start.x * w, item.start.y * h); ctx.lineTo(item.end.x * w, item.end.y * h); 
        ctx.lineTo(item.end.x * w - hl * Math.cos(angle - Math.PI/6), item.end.y * h - hl * Math.sin(angle - Math.PI/6)); 
        ctx.moveTo(item.end.x * w, item.end.y * h); 
        ctx.lineTo(item.end.x * w - hl * Math.cos(angle + Math.PI/6), item.end.y * h - hl * Math.sin(angle + Math.PI/6)); 
        ctx.stroke(); 
    } 
    else if (item.type === 'circle') {
        const rx = Math.abs(item.end.x - item.start.x) * w / 2, ry = Math.abs(item.end.y - item.start.y) * h / 2;
        const cx = (item.start.x + item.end.x) * w / 2, cy = (item.start.y + item.end.y) * h / 2;
        ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI); ctx.stroke();
    }
    else if (item.type === 'rect') {
        const x = item.start.x * w, y = item.start.y * h;
        const rw = (item.end.x - item.start.x) * w, rh = (item.end.y - item.start.y) * h;
        ctx.beginPath(); ctx.rect(x, y, rw, rh); ctx.stroke();
    }
}

function renderDrawing() { 
    ctx.clearRect(0,0,canvas.width,canvas.height); 
    ctx.strokeStyle = '#ffeb3b'; // イエローに変更（視認性アップ）
    ctx.lineWidth = 4; ctx.lineCap = 'round'; 
    drawingLines.forEach(item => drawItem(ctx, item, canvas.width, canvas.height)); 
    if (isDrawing) { 
        if (currentDrawTool === 'freehand' && currentPath.length > 0) drawItem(ctx, currentPath, canvas.width, canvas.height); 
        else if (currentShape) drawItem(ctx, currentShape, canvas.width, canvas.height); 
    } 
}

function enterDrawMode(playId) { 
    player.pauseVideo(); isDrawingMode = true; activePlayIdForDraw = playId; 
    canvas.classList.add('drawing-mode'); document.getElementById('draw-toolbar').style.display = 'flex'; 
    resizeCanvas(); drawingLines = matchDrawings[playId] ? JSON.parse(JSON.stringify(matchDrawings[playId])) : []; 
    renderDrawing(); 
}

function exitDrawMode() { 
    isDrawingMode = false; canvas.classList.remove('drawing-mode'); document.getElementById('draw-toolbar').style.display = 'none'; 
    ctx.clearRect(0,0,canvas.width,canvas.height); 
}

function clearCanvas() { drawingLines = []; renderDrawing(); }
function undoDrawing() { if (drawingLines.length > 0) { drawingLines.pop(); renderDrawing(); } }

async function saveDrawing() { 
    matchDrawings[activePlayIdForDraw] = JSON.parse(JSON.stringify(drawingLines)); 
    render(); exitDrawMode(); player.playVideo(); 
    
    // ★ team_code付きで保存
    await supabaseClient.from('drawings').delete().match({ match_dvw: currentMatchDVW, play_id: activePlayIdForDraw, team_code: MY_TEAM_CODE }); 
    await supabaseClient.from('drawings').insert([{ match_dvw: currentMatchDVW, play_id: activePlayIdForDraw, drawing_data: JSON.stringify(matchDrawings[activePlayIdForDraw]), team_code: MY_TEAM_CODE }]); 
}

// --- キーボードショートカット ---
window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') { if (isDrawingMode) { undoDrawing(); e.preventDefault(); return; } }
    const isInput = e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA';
    if (isInput) return; 
    const key = e.key.toLowerCase();
    
    const activeSuggest = document.querySelector('.auto-suggest-box[style*="block"]');
    if (activeSuggest) {
        const items = activeSuggest.querySelectorAll('.s-item');
        let idx = parseInt(activeSuggest.dataset.activeIdx) || 0;
        if (e.key === 'ArrowUp') {
            idx = (idx - 1 + items.length) % items.length;
            items.forEach((el, i) => el.classList.toggle('active', i === idx));
            activeSuggest.dataset.activeIdx = idx; e.preventDefault(); return;
        } else if (e.key === 'ArrowDown') {
            idx = (idx + 1) % items.length;
            items.forEach((el, i) => el.classList.toggle('active', i === idx));
            activeSuggest.dataset.activeIdx = idx; e.preventDefault(); return;
        } else if (e.key === 'Enter') {
            items[idx]?.click(); e.preventDefault(); return;
        }
    }

    if (key === 'f') playNext();
    else if (key === 'd') playPrev();
    else if (key === 'r') { player.seekTo(currentData[currentIndex].startTime, true); player.playVideo(); }
    else if (key === 'c') {
        if (currentIndex >= 0 && currentData[currentIndex]) {
            toggleActions(null, currentIndex, true);
            setTimeout(() => document.getElementById(`c-input-${currentData[currentIndex].id}`)?.focus(), 50);
        }
    }
    else if (e.key === 'ArrowLeft') { player.seekTo(player.getCurrentTime() - 2, true); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { player.seekTo(player.getCurrentTime() + 2, true); e.preventDefault(); }
    else if (key === 'p') { if (isDrawingMode) saveDrawing(); else if (currentIndex >= 0) enterDrawMode(currentData[currentIndex].id); }
});

// --- 追加: 各プレーのシェア機能 ---
function copyPlayLink(index) {
    const d = currentData[index];
    if (!d) return;
    const url = new URL(window.location.href);
    url.searchParams.set('match', currentMatchDVW);
    url.searchParams.set('t', d.startTime.toFixed(1));
    
    // ★ 追加：URLに合言葉をこっそり含める
    url.searchParams.set('key', MY_TEAM_CODE);
    
    navigator.clipboard.writeText(url.toString()).then(() => {
        alert("🔗 リンクをコピーしました！\n" + url.toString());
    }).catch(err => {
        alert("コピーに失敗しました: " + err);
    });
}

function sendLine(index) {
    const d = currentData[index];
    if (!d) return;
    const url = new URL(window.location.href);
    url.searchParams.set('match', currentMatchDVW);
    url.searchParams.set('t', d.startTime.toFixed(1));
    
    // ★ 追加：URLに合言葉をこっそり含める
    url.searchParams.set('key', MY_TEAM_CODE);
    
    const text = `SyncScout: Set${d.setNum} [${d.score}] #${d.pNum} ${d.pName} のプレー\n`;
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(text + url.toString())}`;
    window.open(lineUrl, '_blank');
}
// --- プレイリスト（複数プレー）のシェア機能 ---
function getPlaylistURL() {
    if (currentData.length === 0) return null;
    // 現在画面に表示されているプレーのIDをカンマ区切りで結合
    const ids = currentData.map(d => d.id).join(',');
    const url = new URL(window.location.href);
    url.searchParams.set('match', currentMatchDVW);
    url.searchParams.set('ids', ids); // プレイリストIDをセット
    url.searchParams.set('key', MY_TEAM_CODE); // 合言葉もセット（自動ログイン用）
    return url.toString();
}

function copyPlaylistLink() {
    const url = getPlaylistURL();
    if (!url) return alert("共有するプレーがリストにありません。");
    navigator.clipboard.writeText(url).then(() => {
        alert(`🔗 ${currentData.length}件のプレイリストURLをコピーしました！`);
    }).catch(err => {
        alert("コピーに失敗しました: " + err);
    });
}

function sharePlaylist() {
    const url = getPlaylistURL();
    if (!url) return alert("共有するプレーがリストにありません。");
    
    const text = `SyncScout: ${currentData.length}件のプレイリスト\n`;
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(text + url)}`;
    window.open(lineUrl, '_blank');
}
// --- 試合削除 ---
async function deleteMatch() {
    if (!currentMatchDVW) return;
    const sel = document.getElementById('matchSelect');
    const matchName = sel.options[sel.selectedIndex]?.text || currentMatchDVW;

    const input = prompt(`この試合を完全に削除します。\n\n対象: 「${matchName}」\n\nコメント・いいね・描画データも全て削除されます。\n確認のため「DELETE」と入力してください。`);
    if (input !== 'DELETE') return;

    const btn = document.getElementById('delete-match-btn');
    btn.disabled = true; btn.textContent = '…';

    try {
        const filePath = new URL(currentMatchDVW).pathname.split('/dvw_files/')[1];
        await Promise.all([
            supabaseClient.storage.from('dvw_files').remove([filePath]),
            supabaseClient.from('comments').delete().eq('match_dvw', currentMatchDVW).eq('team_code', MY_TEAM_CODE),
            supabaseClient.from('likes').delete().eq('match_dvw', currentMatchDVW).eq('team_code', MY_TEAM_CODE),
            supabaseClient.from('drawings').delete().eq('match_dvw', currentMatchDVW).eq('team_code', MY_TEAM_CODE),
            supabaseClient.from('matches').delete().eq('dvw_url', currentMatchDVW).eq('team_code', MY_TEAM_CODE)
        ]);
        alert('削除しました。');
        currentMatchDVW = '';
        btn.style.display = 'none';
        fetchMatchList();
    } catch(e) {
        console.error(e);
        alert('削除に失敗しました: ' + e.message);
    } finally {
        btn.disabled = false; btn.textContent = '🗑️';
    }
}

// 起動！
checkAuth();