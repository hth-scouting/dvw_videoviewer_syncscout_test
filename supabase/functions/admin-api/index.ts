// supabase/functions/admin-api/index.ts
// =====================================================================
// Sync Scout — Admin API
//   マスターパスワードで認証し、teamsテーブルをCRUD操作する。
//   service role key はサーバー側のみ使用。
//
// ▼ デプロイ
//     supabase functions deploy admin-api --no-verify-jwt
//
// ▼ 必要なシークレット
//     supabase secrets set APP_ADMIN_PASSWORD="<管理者パスワード>"
// =====================================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ADMIN_PASSWORD = Deno.env.get("APP_ADMIN_PASSWORD")!;

const cors: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, authorization, apikey, x-admin-key",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "content-type": "application/json" },
  });
}

function generatePasscode(): string {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  const parts: string[] = [];
  for (let p = 0; p < 3; p++) {
    let seg = "";
    for (let i = 0; i < 4; i++) {
      seg += chars[Math.floor(Math.random() * chars.length)];
    }
    parts.push(seg);
  }
  return parts.join("-");
}

function generateSlug(teamName: string): string {
  return teamName
    .toLowerCase()
    .replace(/[^a-z0-9぀-ゟ゠-ヿ一-龯]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 32)
    || `team-${Date.now().toString(36)}`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const adminKey = req.headers.get("x-admin-key") || "";
  if (!adminKey || adminKey !== ADMIN_PASSWORD) {
    return json({ error: "unauthorized" }, 401);
  }

  let body: { action?: string; [key: string]: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const action = body.action;

  // --- LIST ---
  if (action === "list") {
    const { data, error } = await admin
      .from("teams")
      .select("id, slug, team_name, is_active, licence_end_date, subscription_status, created_at")
      .order("created_at", { ascending: false });
    if (error) return json({ error: error.message }, 500);
    return json({ teams: data });
  }

  // --- CREATE ---
  if (action === "create") {
    const teamName = typeof body.team_name === "string" ? body.team_name.trim() : "";
    const licenceEnd = typeof body.licence_end_date === "string" ? body.licence_end_date : "";
    if (!teamName || !licenceEnd) return json({ error: "team_name and licence_end_date required" }, 400);

    const slug = typeof body.slug === "string" && body.slug.trim()
      ? body.slug.trim().toLowerCase()
      : generateSlug(teamName);
    const passcode = generatePasscode();

    const { data, error } = await admin
      .from("teams")
      .insert({ team_name: teamName, slug, passcode, licence_end_date: licenceEnd, is_active: true })
      .select()
      .single();
    if (error) return json({ error: error.message }, 500);
    return json({ team: data, generated_passcode: passcode });
  }

  // --- UPDATE ---
  if (action === "update") {
    const id = body.id;
    if (!id) return json({ error: "id required" }, 400);

    const updates: Record<string, unknown> = {};
    if (typeof body.team_name === "string") updates.team_name = body.team_name.trim();
    if (typeof body.is_active === "boolean") updates.is_active = body.is_active;
    if (typeof body.licence_end_date === "string") updates.licence_end_date = body.licence_end_date;
    if (body.reset_passcode === true) updates.passcode = generatePasscode();

    if (Object.keys(updates).length === 0) return json({ error: "nothing to update" }, 400);

    const { data, error } = await admin
      .from("teams")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) return json({ error: error.message }, 500);
    return json({ team: data, new_passcode: updates.passcode || null });
  }

  // --- GENERATE SETUP TOKEN ---
  if (action === "generate_token") {
    const teamName = typeof body.team_name === "string" ? body.team_name.trim() : "";
    const licenceEnd = typeof body.licence_end_date === "string" ? body.licence_end_date : "";
    if (!teamName || !licenceEnd) return json({ error: "team_name and licence_end_date required" }, 400);

    const token = crypto.randomUUID();
    const { error } = await admin
      .from("setup_tokens")
      .insert({ token, team_name: teamName, licence_end_date: licenceEnd });
    if (error) return json({ error: error.message }, 500);

    return json({ token });
  }

  return json({ error: "unknown_action" }, 400);
});
