// =====================================================================
// app.js  v2.0 — i18n + UI refresh
// =====================================================================

// --- 0. i18n (Internationalization) ---
const i18n = {
    en: {
        select_match: "Select Match...",
        add_match: "Add Match",
        delete_match: "Delete match",
        logout: "Logout",
        rallies: "Rallies",
        individual: "Individual",
        table: "Table",
        rotation: "Rotation",
        server_team: "1. Server Team",
        both_teams: "Both Teams",
        filter_team: "1. Team",
        select_team: "Select Team",
        filter_player: "2. Player",
        all_players: "All Players",
        filter_skill: "3. Skill",
        filter_effect: "4. Effect",
        all: "All",
        search_comments: "Search Comments / Tags",
        search_placeholder: "Keyword (e.g. #MB, #Good)",
        copy_url: "Copy URL",
        share_line: "Share LINE",
        auto_skip: "Auto-Skip",
        add_new_match: "Add New Match",
        category: "Category",
        cat_placeholder: "Select or type new category",
        dvw_file: "DVW File",
        upload_save: "Upload & Save",
        shortcuts: "Keyboard Shortcuts",
        sc_next_prev: "Next / Prev",
        sc_repeat: "Repeat",
        sc_seek: "-2s / +2s",
        sc_draw: "Draw On/Save",
        sc_undo: "Undo Draw",
        sc_note: "Focus Note",
        sc_submit: "Submit",
        sc_tag: "Select Tag",
        close: "Close",
        undo: "Undo",
        clear: "Clear",
        cancel: "Cancel",
        save_draw: "Save (P)",
        no_plays: "No plays found.",
        analyzing: "Analyzing file...",
        file_error: "File load error.",
        no_matches: "No matches",
        no_categories: "No Categories",
        select_team_msg: "Please select a team to view player stats",
        no_data_msg: "No match data yet for this team.\nAdd one with \"+ Add Match\".",
        confirm_logout: "Log out?",
        confirm_delete_comment: "Delete this?",
        upload_all_required: "Please fill in all fields",
        upload_success: "Match added successfully!",
        upload_fail: "Failed to add match.",
        uploading: "Uploading...",
        delete_confirm_prompt: "This will permanently delete this match.\n\nTarget: \"{name}\"\n\nAll comments, likes, and drawings will also be deleted.\nType \"DELETE\" to confirm.",
        deleted: "Deleted.",
        delete_fail: "Failed to delete: ",
        link_copied: "Link copied!",
        playlist_copied: "{n} plays playlist URL copied!",
        copy_fail: "Copy failed: ",
        no_plays_to_share: "No plays in list to share.",
        login_title: "Sync Scout",
        login_sub: "Log in with your team passcode",
        login_team_id: "Team ID",
        login_team_placeholder: "e.g. blue-tiger",
        login_pass: "Passcode",
        login_pass_placeholder: "Your team passcode",
        login_btn: "Log In",
        login_checking: "Checking...",
        login_required: "Please enter team ID and passcode",
        login_expired: "License expired. Please contact your admin.",
        login_invalid: "Team ID or passcode is incorrect.",
        note_placeholder: "Note...",
        send: "Send",
        draw_label: "Draw",
        note_label: "Note",
        copy_link: "Copy Link",
        send_line: "Send LINE",
        serves: " Serves",
        stats_label: " Stats",
        rotation_label: " Rotation",
        player_col: "Player",
    },
    ja: {
        select_match: "試合を選択...",
        add_match: "試合追加",
        delete_match: "試合を削除",
        logout: "ログアウト",
        rallies: "ラリー",
        individual: "個人",
        table: "統計",
        rotation: "ローテ",
        server_team: "1. サーブチーム",
        both_teams: "両チーム",
        filter_team: "1. チーム",
        select_team: "チーム選択",
        filter_player: "2. 選手",
        all_players: "全選手",
        filter_skill: "3. スキル",
        filter_effect: "4. 評価",
        all: "全て",
        search_comments: "コメント・タグ検索",
        search_placeholder: "キーワード（例: #MB, #Good）",
        copy_url: "URLコピー",
        share_line: "LINE共有",
        auto_skip: "自動スキップ",
        add_new_match: "新しい試合を追加",
        category: "カテゴリ",
        cat_placeholder: "カテゴリを選択または入力",
        dvw_file: "DVWファイル",
        upload_save: "アップロード & 保存",
        shortcuts: "キーボードショートカット",
        sc_next_prev: "次 / 前",
        sc_repeat: "リプレイ",
        sc_seek: "-2秒 / +2秒",
        sc_draw: "描画 開始/保存",
        sc_undo: "描画 元に戻す",
        sc_note: "ノート フォーカス",
        sc_submit: "送信",
        sc_tag: "タグ選択",
        close: "閉じる",
        undo: "元に戻す",
        clear: "クリア",
        cancel: "キャンセル",
        save_draw: "保存 (P)",
        no_plays: "プレーが見つかりません。",
        analyzing: "ファイル解析中...",
        file_error: "ファイル読み込みエラー。",
        no_matches: "試合なし",
        no_categories: "カテゴリなし",
        select_team_msg: "チームを選択してください",
        no_data_msg: "まだ試合データがありません。\n「＋ 試合追加」から追加してください。",
        confirm_logout: "ログアウトしますか？",
        confirm_delete_comment: "削除しますか？",
        upload_all_required: "全て入力してください",
        upload_success: "追加しました！",
        upload_fail: "追加に失敗しました。",
        uploading: "アップロード中...",
        delete_confirm_prompt: "この試合を完全に削除します。\n\n対象: 「{name}」\n\nコメント・いいね・描画データも全て削除されます。\n確認のため「DELETE」と入力してください。",
        deleted: "削除しました。",
        delete_fail: "削除に失敗しました: ",
        link_copied: "リンクをコピーしました！",
        playlist_copied: "{n}件のプレイリストURLをコピーしました！",
        copy_fail: "コピーに失敗しました: ",
        no_plays_to_share: "共有するプレーがリストにありません。",
        login_title: "Sync Scout",
        login_sub: "チームの合言葉でログイン",
        login_team_id: "チームID",
        login_team_placeholder: "例: blue-tiger",
        login_pass: "合言葉",
        login_pass_placeholder: "チームの合言葉",
        login_btn: "ログイン",
        login_checking: "確認中…",
        login_required: "チームIDと合言葉を入力してください",
        login_expired: "ライセンスの有効期限が切れています。管理者にお問い合わせください。",
        login_invalid: "チームIDまたは合言葉が違います。",
        note_placeholder: "ノート...",
        send: "送信",
        draw_label: "描画",
        note_label: "ノート",
        copy_link: "リンクコピー",
        send_line: "LINE送信",
        serves: " サーブ",
        stats_label: " 統計",
        rotation_label: " ローテ",
        player_col: "選手",
    }
};

let currentLang = localStorage.getItem('syncscout_lang') || 'en';

function t(key, replacements) {
    let str = (i18n[currentLang] && i18n[currentLang][key]) || (i18n.en[key]) || key;
    if (replacements) {
        Object.keys(replacements).forEach(k => { str = str.replace(`{${k}}`, replacements[k]); });
    }
    return str;
}

function applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        el.title = t(el.dataset.i18nTitle);
    });
    const langLabel = document.getElementById('lang-label');
    if (langLabel) langLabel.textContent = currentLang === 'en' ? 'EN' : 'JA';
}

function toggleLang() {
    currentLang = currentLang === 'en' ? 'ja' : 'en';
    localStorage.setItem('syncscout_lang', currentLang);
    applyI18n();
    if (allPlays.length > 0 || rallies.length > 0) render();
}

function hideAllTagPopups() { document.querySelectorAll('.tag-popup').forEach(p => p.classList.remove('show')); }

// --- Mobile menu ---
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('show');
        if (menu.classList.contains('show')) syncMobileMenuSelects();
    }
}
document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-menu-toggle');
    if (menu && menu.classList.contains('show') && !menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove('show');
    }
});

function syncMobileMenuSelects() {
    const catMenu = document.getElementById('catSelectMobileMenu');
    const catDesktop = document.getElementById('catSelectMobile');
    if (catMenu && catDesktop) {
        catMenu.innerHTML = catDesktop.innerHTML;
        catMenu.value = catDesktop.value;
    }
    const matchMenu = document.getElementById('matchSelectMobile');
    const matchDesktop = document.getElementById('matchSelect');
    if (matchMenu && matchDesktop) {
        matchMenu.innerHTML = matchDesktop.innerHTML;
        matchMenu.value = matchDesktop.value;
        matchMenu.disabled = matchDesktop.disabled;
    }
}

// --- 1. Supabase 設定 & 認証 (slug + 合言葉 / トークン方式) ---
const SUPABASE_URL = 'https://ciokifeakrkigonhwbyf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpb2tpZmVha3JraWdvbmh3YnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5ODQxNjgsImV4cCI6MjA5MDU2MDE2OH0.NYqH52Rl7Gn9SKeF3mnDioEphpoKpCDrxv6NifU69Po';
const LOGIN_FN_URL = `${SUPABASE_URL}/functions/v1/team-login`;

let MY_TEAM_CODE = null;
let MY_TEAM_SLUG = null;
let MY_TEAM_NAME = null;
let supabaseClient;

function getStoredAuth() {
    try {
        const raw = localStorage.getItem('courtend_auth');
        if (!raw) return null;
        const a = JSON.parse(raw);
        if (!a.token || !a.expires_at || Date.now() > a.expires_at) return null;
        return a;
    } catch { return null; }
}

function saveAuth(d) {
    localStorage.setItem('courtend_auth', JSON.stringify({
        token: d.token,
        team_name: d.team_name,
        team_code: d.team_code,
        slug: d.slug,
        expires_at: Date.now() + ((d.expires_in || 3600) - 60) * 1000,
    }));
}

function clearAuth() {
    localStorage.removeItem('courtend_auth');
    localStorage.removeItem('courtend_team_code');
    localStorage.removeItem('courtend_team_name');
}

async function requestToken(slug, passcode) {
    try {
        const res = await fetch(LOGIN_FN_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ slug, passcode }),
        });
        const data = await res.json().catch(() => ({}));
        return { ok: res.ok, status: res.status, data };
    } catch {
        return { ok: false, status: 0, data: {} };
    }
}

function showLogin(prefill) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.id = 'login-overlay';
        overlay.innerHTML = `
        <style>
          #login-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;
            justify-content:center;background:linear-gradient(135deg,#16192a 0%,#1a2040 50%,#0f1626 100%);
            font-family:'Inter',system-ui,sans-serif;padding:20px;}
          #login-overlay .login-card{background:#fff;border-radius:20px;padding:36px 32px;width:100%;
            max-width:380px;box-shadow:0 24px 80px rgba(0,0,0,.4);border:1px solid rgba(255,255,255,0.06);}
          #login-overlay .login-logo{width:48px;height:48px;border-radius:14px;
            background:linear-gradient(135deg,#4f6ef7,#7c5ef7);display:flex;align-items:center;
            justify-content:center;font-weight:900;font-size:1.3rem;color:#fff;margin-bottom:20px;
            box-shadow:0 4px 16px rgba(79,110,247,0.3);}
          #login-overlay h1{margin:0 0 4px;font-size:1.4rem;color:#1a1d26;font-weight:800;}
          #login-overlay .login-sub{margin:0 0 24px;color:#8b91a0;font-size:.85rem;}
          #login-overlay label{display:block;font-size:.72rem;font-weight:700;color:#5a6072;margin:16px 0 6px;text-transform:uppercase;letter-spacing:0.3px;}
          #login-overlay input{width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #e2e5eb;
            border-radius:10px;font-size:1rem;outline:none;transition:0.2s;font-family:'Inter',system-ui,sans-serif;}
          #login-overlay input:focus{border-color:#4f6ef7;box-shadow:0 0 0 3px rgba(79,110,247,0.15);}
          #login-btn{width:100%;margin-top:24px;padding:13px;border:0;border-radius:10px;
            background:#4f6ef7;color:#fff;font-size:1rem;font-weight:700;cursor:pointer;
            transition:0.2s;font-family:'Inter',system-ui,sans-serif;}
          #login-btn:hover{background:#3b5de6;}
          #login-btn:disabled{opacity:.5;cursor:default;}
          #login-overlay .login-err{min-height:1.2em;margin:14px 0 0;color:#e53935;font-size:.8rem;text-align:center;font-weight:500;}
        </style>
        <div class="login-card">
          <div class="login-logo">S</div>
          <h1>${t('login_title')}</h1>
          <p class="login-sub">${t('login_sub')}</p>
          <label>${t('login_team_id')}</label>
          <input id="login-slug" type="text" autocomplete="off" placeholder="${t('login_team_placeholder')}" value="${(prefill && prefill.slug) || ''}">
          <label>${t('login_pass')}</label>
          <input id="login-pass" type="password" autocomplete="off" placeholder="${t('login_pass_placeholder')}">
          <button id="login-btn">${t('login_btn')}</button>
          <p id="login-err" class="login-err"></p>
        </div>`;
        document.body.appendChild(overlay);

        const slugEl = overlay.querySelector('#login-slug');
        const passEl = overlay.querySelector('#login-pass');
        const btn = overlay.querySelector('#login-btn');
        const err = overlay.querySelector('#login-err');

        async function submit() {
            const slug = slugEl.value.trim().toLowerCase();
            const passcode = passEl.value.trim();
            if (!slug || !passcode) { err.innerText = t('login_required'); return; }
            btn.disabled = true; err.innerText = t('login_checking');
            const { ok, status, data } = await requestToken(slug, passcode);
            if (ok && data.token) {
                saveAuth(data);
                overlay.remove();
                resolve(data.token);
                return;
            }
            btn.disabled = false;
            err.innerText = status === 403 ? t('login_expired') : t('login_invalid');
        }

        btn.onclick = submit;
        passEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
        ((prefill && prefill.slug) ? passEl : slugEl).focus();
    });
}

async function checkAuth() {
    const params = new URLSearchParams(window.location.search);
    const linkSlug = params.get('team');
    const linkPass = params.get('key');

    let auth = getStoredAuth();

    if (!auth && linkSlug && linkPass) {
        const { ok, data } = await requestToken(linkSlug.trim().toLowerCase(), linkPass.trim());
        if (ok && data.token) {
            saveAuth(data);
            auth = getStoredAuth();
        }
        params.delete('team'); params.delete('key');
        const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
        window.history.replaceState({}, '', newUrl);
    }

    if (!auth) {
        await showLogin({ slug: linkSlug });
        auth = getStoredAuth();
        if (!auth) return;
    }

    MY_TEAM_CODE = auth.team_code;
    MY_TEAM_SLUG = auth.slug;
    MY_TEAM_NAME = auth.team_name;

    const badge = document.getElementById('team-badge');
    if (badge) {
        badge.innerText = MY_TEAM_NAME;
        badge.style.display = 'inline-flex';
    }

    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: { headers: { Authorization: `Bearer ${auth.token}` } },
        auth: { persistSession: false },
    });

    applyI18n();

    if (window.YT && window.YT.Player) {
        onYouTubeIframeAPIReady();
    } else {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
    }
}

function logout() {
    if (confirm(t('confirm_logout'))) {
        clearAuth();
        location.reload();
    }
}

// --- 2. グローバル変数 & YouTube 初期化 ---
function getSafeURLParams() {
    const params = new URLSearchParams(window.location.search);
    let q = params.get('q');
    let ids = params.get('ids');
    const href = window.location.href;

    if (!ids && href.includes('ids=')) {
        ids = href.split('ids=')[1].split('&')[0];
    }
    if (!q) {
        if (href.includes('q=#')) q = '#' + href.split('q=#')[1].split('&')[0];
        else if (href.includes('q=%23')) q = '#' + href.split('q=%23')[1].split('&')[0];
    }

    const matchParam = params.get('match') || (href.includes('match=') ? href.split('match=')[1].split('&')[0] : null);

    return {
        match: matchParam,
        t: params.get('t'),
        q: q ? decodeURIComponent(q) : null,
        ids: ids ? decodeURIComponent(ids) : null
    };
}
const urlParams = getSafeURLParams();
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
        playerVars:{'playsinline':1,'rel':0,'modestbranding':1,'controls':0},
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
        else { document.getElementById('instanceList').innerHTML = `<div class="empty-msg">${t('no_data_msg')}</div>`; }
    });
}

function renderCategoryTabs(cats) {
    const div = document.getElementById('catTabs'); if(!div) return; div.innerHTML = '';
    if (cats.length <= 1) div.innerHTML = `<span class="empty-msg" style="padding:4px 8px;font-size:0.75rem;">${t('no_categories')}</span>`;
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
    select.innerHTML = `<option value="">${t('select_match')}</option>`; matchMap = {};
    const filtered = allMatchData.filter(m => currentCategory === "All" || m.cat === currentCategory);
    if(filtered.length === 0) { select.innerHTML = `<option value="">${t('no_matches')}</option>`; select.disabled = true; }
    else { select.disabled = false; filtered.forEach(m => { matchMap[m.dvw] = m.vid; let name = m.display_name ? m.display_name : m.dvw.split('/').pop().replace('.dvw',''); select.add(new Option(name, m.dvw)); }); }
    syncMobileMenuSelects();
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

    if(!cat || !ytUrl || !fileInput.files.length) return alert(t('upload_all_required'));

    let ytId = ytUrl;
    if(ytUrl.includes('v=')) ytId = ytUrl.split('v=')[1].split('&')[0];
    else if(ytUrl.includes('youtu.be/')) ytId = ytUrl.split('youtu.be/')[1].split('?')[0];

    const file = fileInput.files[0];
    const fileName = Date.now() + "_" + file.name;
    const btn = document.getElementById('am-submit-btn');
    btn.innerText = t('uploading'); btn.disabled = true;

    try {
        const { error: uploadError } = await supabaseClient.storage.from('dvw_files').upload(fileName, file);
        if (uploadError) throw new Error("Storage Upload Error: " + uploadError.message);

        const { data: urlData } = supabaseClient.storage.from('dvw_files').getPublicUrl(fileName);

        const { error: dbError } = await supabaseClient.from('matches').insert([{
            category: cat,
            dvw_filename: file.name,
            dvw_url: urlData.publicUrl,
            youtube_id: ytId,
            team_code: MY_TEAM_CODE
        }]);
        if(dbError) throw new Error("DB Insert Error: " + dbError.message);

        alert(t('upload_success'));
        document.getElementById('add-match-modal').style.display = 'none';
        document.getElementById('am-cat').value = '';
        document.getElementById('am-yt').value = '';
        document.getElementById('am-file').value = '';
        fetchMatchList();
    } catch(e) {
        console.error(e); alert(t('upload_fail') + "\n\n" + e.message);
    } finally {
        btn.innerText = t('upload_save'); btn.disabled = false;
    }
}

function onMatchChange(dvw) {
    const delBtn = document.getElementById('delete-match-btn');
    if (!dvw || !matchMap[dvw]) { if(delBtn) delBtn.style.display = 'none'; return; }
    if(delBtn) delBtn.style.display = 'inline-flex';
    currentMatchDVW = dvw; player.loadVideoById(matchMap[dvw]);
    document.getElementById('instanceList').innerHTML = `<div class="empty-msg">${t('analyzing')}</div>`;
    fetch(dvw).then(res => res.text()).then(parseDVW).catch(e => {
        document.getElementById('instanceList').innerHTML = `<div class="empty-msg">${t('file_error')}</div>`;
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

        render();

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
}

async function loadCloudData() {
    const [cRes, lRes, dRes] = await Promise.all([
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
    document.getElementById('teamFilterRally').innerHTML = `<option value="">${t('both_teams')}</option><option value="*">${h}${t('serves')}</option><option value="a">${a}${t('serves')}</option>`;
    document.getElementById('teamFilterPlayer').innerHTML = `<option value="">${t('select_team')}</option><option value="*">${h}</option><option value="a">${a}</option>`;
    document.getElementById('score-overlay').style.display = 'flex';
}
function onTeamChangePlayer() {
    const team = document.getElementById('teamFilterPlayer').value, ps = document.getElementById('playerFilter'); ps.innerHTML = `<option value="">${t('all_players')}</option>`; if (!team) return;
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
function toggleOverlay() {
    const ov = document.getElementById('score-overlay');
    if (ov) ov.style.display = ov.style.display === 'none' ? 'flex' : 'none';
}

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

    } else if (q.startsWith('ids:')) {
        const idArray = q.replace('ids:', '').split(',').map(Number);
        data = allPlays.filter(d => idArray.includes(d.id));

    } else if (q.startsWith('id:')) {
        data = allPlays.filter(d => d.id === parseInt(q.replace('id:', '').trim()));

    } else if (q) {
        data = allPlays.filter(d => `${d.pName} ${d.skill} ${(matchComments[d.id]||[]).join(' ')}`.toLowerCase().includes(q));
    } else {
        if (currentMode === 'rally') {
            data = rallies; const tf = document.getElementById('teamFilterRally').value; if(tf) data = data.filter(d => d.side === tf);
        } else {
            data = allPlays; const tf = document.getElementById('teamFilterPlayer').value;
            if (!tf) { list.innerHTML = `<div class="empty-msg">${t('select_team_msg')}</div>`; return; }
            const pF = document.getElementById('playerFilter').value, sF = document.getElementById('skillFilter').value, eF = document.getElementById('effectFilter').value;
            data = data.filter(d => d.side === tf && (!pF || d.pName === pF) && (!sF || d.skill === sF) && (!eF || d.effect === eF));
        }
    }

    currentData = data;
    if (currentData.length === 0) { list.innerHTML = `<div class="empty-msg">${t('no_plays')}</div>`; return; }

    let lastSet = -1;
    currentData.forEach((d, i) => {
        if (d.setNum !== lastSet) {
            list.innerHTML += `<div class="stats-section-title">SET ${d.setNum}</div>`;
            lastSet = d.setNum;
        }

        const likes = matchLikes[d.id] || 0;
        const liked = likedPlaysSession.has(d.id) ? 'style="color:#e53935; border-color:#e53935;"' : '';
        const btn = document.createElement('div');
        btn.className = `instance-btn`;
        btn.id = 'idx-'+i;

        if (d.side === '*') btn.style.borderLeftColor = 'var(--home-accent)';
        else if (d.side === 'a') btn.style.borderLeftColor = 'var(--away-accent)';

        const cHTML = (matchComments[d.id] || []).map((c, cidx) => `<div class="comment-item"><span>${escapeHtml(c)}</span><span class="del-comment" onclick="event.stopPropagation(); deleteComment(${d.id}, ${cidx})">&#x2716;</span></div>`).join('');
        const hasDraw = (matchDrawings[d.id] && matchDrawings[d.id].length > 0) ? 'style="background:var(--danger-subtle); color:var(--danger); font-weight:bold;"' : '';
        const cCount = (matchComments[d.id] || []).length;
        const noteBtnStyle = cCount > 0 ? `style="background:var(--primary-subtle); color:var(--primary); font-weight:bold;"` : '';

        btn.innerHTML = `
            <div class="card-main" onclick="playIndex(${i})">
                <div class="score-box">${escapeHtml(d.score)}</div>
                <div style="flex:1; line-height:1.3;">
                    <div style="font-weight:700; font-size:0.88rem; color:var(--text);">#${escapeHtml(d.pNum)} ${escapeHtml(d.pName.split(' ')[0])}</div>
                    <div style="color:var(--text-muted); font-size:0.75rem; margin-top:2px; font-weight:500;">P${escapeHtml(d.rot)} &middot; ${escapeHtml(d.skill)}${escapeHtml(d.effect)}</div>
                </div>
            </div>
            <div class="top-right-actions">
                <button class="action-sm-btn" ${liked} onclick="event.stopPropagation(); addLike(${d.id})">&#x1F44D; ${likes}</button>
                <button class="action-sm-btn" ${hasDraw} onclick="event.stopPropagation(); enterDrawMode(${d.id})">&#x270F;&#xFE0F; ${t('draw_label')}</button>
                <button class="action-sm-btn" ${noteBtnStyle} onclick="toggleActions(event, ${i})">&#x1F4AC; ${t('note_label')} ${cCount ? `(${cCount})` : ''}</button>
            </div>
            <div class="card-actions" id="actions-${i}">
                <div id="c-disp-${d.id}">${cHTML}</div>
                <div class="action-row">
                    <div class="tag-popup" id="tags-${d.id}">${starterTags.map(tg => `<div class="tag-chip" onclick="applyTag(${d.id}, '${tg}')">${tg}</div>`).join('')}</div>
                    <button class="tag-trigger" onclick="event.stopPropagation(); toggleTagPopup(${d.id})">#</button>
                    <div style="flex:1; position:relative;">
                      <input type="text" class="comment-input" id="c-input-${d.id}" placeholder="${t('note_placeholder')}" autocomplete="off" oninput="handleSuggestInput(event, ${d.id})" onclick="event.stopPropagation()" onkeydown="if(event.key === 'Enter'){ event.preventDefault(); event.stopPropagation(); addComment(${d.id}); }">
                        <div class="auto-suggest-box" id="suggest-${d.id}"></div>
                    </div>
                    <button class="action-btn add-btn" onclick="event.stopPropagation(); addComment(${d.id})">${t('send')}</button>
                </div>
                <div class="action-row" style="margin-top: 5px;">
                    <button class="action-btn copy-link-btn" onclick="event.stopPropagation(); copyPlayLink(${i})">&#x1F517; ${t('copy_link')}</button>
                    <button class="action-btn line-btn" onclick="event.stopPropagation(); sendLine(${i})">&#x1F7E2; ${t('send_line')}</button>
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
        list.innerHTML += `<div class="stats-section-title">${team}${t('stats_label')}</div><div class="stats-container"><table class="stats-table" id="t-${side}"></table></div>`;
        buildTable(side, `t-${side}`);
    });
}

function buildTable(side, targetId) {
    const ps = []; const seen = new Set();

    allPlays.filter(p => p.side === side).forEach(p => {
        if (!p.pNum || isNaN(parseInt(p.pNum)) || p.pNum === "undefined" || p.pNum === "NaN") return;
        if (!seen.has(p.pName)) {
            ps.push({ name: p.pName, num: parseInt(p.pNum) });
            seen.add(p.pName);
        }
    });

    ps.sort((a,b) => a.num - b.num);

    let html = `<tr><th rowspan="2">${t('player_col')}</th><th colspan="3">Serve</th><th colspan="4">Rec</th><th colspan="4">Attack</th></tr><tr><th>Tot</th><th>Ace</th><th>Err</th><th>Tot</th><th>Err</th><th>#+%</th><th>#%</th><th>Tot</th><th>Kill</th><th>Err</th><th>%</th></tr>`;

    ps.forEach(p => {
        const pl = allPlays.filter(play => play.pName === p.name && play.side === side), s = pl.filter(d => d.skill === 'S'), r = pl.filter(d => d.skill === 'R'), a = pl.filter(d => d.skill === 'A');
        const sAce = s.filter(d => d.effect === '#').length, sErr = s.filter(d => d.effect === '=').length;
        const rErr = r.filter(d => d.effect === '=').length, rPerf = r.filter(d => d.effect === '#').length, rPos = r.filter(d => d.effect === '+').length;
        const aKill = a.filter(d => d.effect === '#').length, aLoss = a.filter(d => d.effect === '=' || d.effect === '/').length;
        const esc = jsAttr(p.name);

        html += `<tr>
            <td style="text-align:left; font-weight:600;">#${p.num} ${escapeHtml(p.name.split(' ')[0])}</td>
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
        list.innerHTML += `<div class="stats-section-title">${team}${t('rotation_label')}</div><div class="stats-container"><table class="stats-table" id="t-rot-${side}"></table></div>`;
        buildRotationTable(side, `t-rot-${side}`);
    });
}

function buildRotationTable(side, targetId) {
    let html = `<tr><th rowspan="2">Rot</th><th colspan="3">Side Out Phase</th><th colspan="5">Break Phase</th></tr><tr><th>Tot</th><th>Won</th><th>SO %</th><th>Tot</th><th>Ace</th><th>Err</th><th>Won</th><th>BP %</th></tr>`;
    [1, 6, 5, 4, 3, 2].forEach(r => {
        const oppSide = side === '*' ? 'a' : '*';
        const soRallies = rallies.filter(d => d.side === oppSide && (side === '*' ? d.rallyHomeRot : d.rallyAwayRot) === r);
        const soTot = soRallies.length, soWon = soRallies.filter(d => d.wonBy === side).length, soPct = soTot ? Math.round((soWon / soTot) * 100) : 0;
        const soColor = soPct >= 65 ? 'var(--danger)' : (soPct < 50 ? 'var(--primary)' : 'var(--text)');

        const bpRallies = rallies.filter(d => d.side === side && (side === '*' ? d.rallyHomeRot : d.rallyAwayRot) === r);
        const bpTot = bpRallies.length, bpAce = bpRallies.filter(d => d.effect === '#').length, bpErr = bpRallies.filter(d => d.effect === '=').length;
        const bpWon = bpRallies.filter(d => d.wonBy === side).length, bpPct = bpTot ? Math.round((bpWon / bpTot) * 100) : 0;
        const bpColor = bpPct >= 40 ? 'var(--danger)' : (bpPct < 25 ? 'var(--primary)' : 'var(--text)');

        html += `<tr>
            <td style="font-weight:700; background:var(--primary-subtle); color:var(--primary);">P${r}</td>
            <td><span class="click-num" onclick="jumpToRotationRallies('${side}', ${r}, 'so')">${soTot}</span></td><td>${soWon}</td><td style="font-weight:700; color:${soColor}">${soPct}%</td>
            <td><span class="click-num" onclick="jumpToRotationRallies('${side}', ${r}, 'bp')">${bpTot}</span></td><td>${bpAce}</td><td>${bpErr}</td><td>${bpWon}</td><td style="font-weight:700; color:${bpColor}">${bpPct}%</td>
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

    await supabaseClient.from('comments').insert([{ match_dvw: currentMatchDVW, play_id: playId, comment_text: text, team_code: MY_TEAM_CODE }]);
}

async function deleteComment(playId, idx) {
    if(!confirm(t('confirm_delete_comment'))) return;
    const text = (matchComments[playId] || [])[idx];
    if (text === undefined) return;
    matchComments[playId].splice(idx, 1);
    render();

    await supabaseClient.from('comments').delete().match({ match_dvw: currentMatchDVW, play_id: playId, comment_text: text, team_code: MY_TEAM_CODE });
}

async function addLike(playId) {
    if (likedPlaysSession.has(playId)) return;
    likedPlaysSession.add(playId);
    matchLikes[playId] = (matchLikes[playId] || 0) + 1;
    render();

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
        const searchStr = currentWord.replace(/^#/, '').toLowerCase(), matches = starterTags.filter(tg => tg.toLowerCase().includes(searchStr) || tg.toLowerCase().replace(/^#/, '').includes(searchStr));
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
function replayCurrentPlay() { if (currentIndex >= 0 && currentData[currentIndex]) { player.seekTo(currentData[currentIndex].startTime, true); player.playVideo(); } }

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
    ctx.strokeStyle = '#ffeb3b';
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

// --- シェア機能 ---
function copyPlayLink(index) {
    const d = currentData[index];
    if (!d) return;
    const url = new URL(window.location.href);
    url.searchParams.set('match', currentMatchDVW);
    url.searchParams.set('t', d.startTime.toFixed(1));
    url.searchParams.set('key', MY_TEAM_CODE);
    url.searchParams.set('team', MY_TEAM_SLUG);

    navigator.clipboard.writeText(url.toString()).then(() => {
        alert(t('link_copied'));
    }).catch(err => {
        alert(t('copy_fail') + err);
    });
}

function sendLine(index) {
    const d = currentData[index];
    if (!d) return;
    const url = new URL(window.location.href);
    url.searchParams.set('match', currentMatchDVW);
    url.searchParams.set('t', d.startTime.toFixed(1));
    url.searchParams.set('key', MY_TEAM_CODE);
    url.searchParams.set('team', MY_TEAM_SLUG);

    const text = `SyncScout: Set${d.setNum} [${d.score}] #${d.pNum} ${d.pName}\n`;
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(text + url.toString())}`;
    window.open(lineUrl, '_blank');
}

function getPlaylistURL() {
    if (currentData.length === 0) return null;
    const ids = currentData.map(d => d.id).join(',');
    const url = new URL(window.location.href);
    url.searchParams.set('match', currentMatchDVW);
    url.searchParams.set('ids', ids);
    url.searchParams.set('key', MY_TEAM_CODE);
    return url.toString();
}

function copyPlaylistLink() {
    const url = getPlaylistURL();
    if (!url) return alert(t('no_plays_to_share'));
    navigator.clipboard.writeText(url).then(() => {
        alert(t('playlist_copied', { n: currentData.length }));
    }).catch(err => {
        alert(t('copy_fail') + err);
    });
}

function sharePlaylist() {
    const url = getPlaylistURL();
    if (!url) return alert(t('no_plays_to_share'));

    const text = `SyncScout: ${currentData.length} plays playlist\n`;
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(text + url)}`;
    window.open(lineUrl, '_blank');
}

// --- 試合削除 ---
async function deleteMatch() {
    if (!currentMatchDVW) return;
    const sel = document.getElementById('matchSelect');
    const matchName = sel.options[sel.selectedIndex]?.text || currentMatchDVW;

    const input = prompt(t('delete_confirm_prompt', { name: matchName }));
    if (input !== 'DELETE') return;

    const btn = document.getElementById('delete-match-btn');
    btn.disabled = true; btn.style.opacity = '0.5';

    try {
        const filePath = new URL(currentMatchDVW).pathname.split('/dvw_files/')[1];
        await Promise.all([
            supabaseClient.storage.from('dvw_files').remove([filePath]),
            supabaseClient.from('comments').delete().eq('match_dvw', currentMatchDVW).eq('team_code', MY_TEAM_CODE),
            supabaseClient.from('likes').delete().eq('match_dvw', currentMatchDVW).eq('team_code', MY_TEAM_CODE),
            supabaseClient.from('drawings').delete().eq('match_dvw', currentMatchDVW).eq('team_code', MY_TEAM_CODE),
            supabaseClient.from('matches').delete().eq('dvw_url', currentMatchDVW).eq('team_code', MY_TEAM_CODE)
        ]);
        alert(t('deleted'));
        currentMatchDVW = '';
        btn.style.display = 'none';
        fetchMatchList();
    } catch(e) {
        console.error(e);
        alert(t('delete_fail') + e.message);
    } finally {
        btn.disabled = false; btn.style.opacity = '1';
    }
}

// 起動！
checkAuth();
