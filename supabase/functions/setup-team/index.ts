// supabase/functions/setup-team/index.ts
// =====================================================================
// Sync Scout — Self-Service Team Setup
//   ワンタイムトークンでユーザーが自分のslug・パスコードを設定する。
//
// ▼ デプロイ
//     supabase functions deploy setup-team --no-verify-jwt
//
// ▼ 必要なテーブル (Supabase SQL Editor で実行)
//     CREATE TABLE setup_tokens (
//       id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
//       token text NOT NULL UNIQUE,
//       team_name text NOT NULL,
//       licence_end_date date NOT NULL,
//       used boolean NOT NULL DEFAULT false,
//       created_at timestamptz NOT NULL DEFAULT now()
//     );
// =====================================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const cors: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, authorization, apikey",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "content-type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  let body: { action?: string; [key: string]: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  const db = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  // --- VALIDATE TOKEN (check if token is valid and unused) ---
  if (body.action === "validate") {
    const token = typeof body.token === "string" ? body.token.trim() : "";
    if (!token) return json({ error: "token_required" }, 400);

    const { data, error } = await db
      .from("setup_tokens")
      .select("id, team_name, used")
      .eq("token", token)
      .single();

    if (error || !data) return json({ error: "invalid_token" }, 404);
    if (data.used) return json({ error: "token_used" }, 410);

    return json({ valid: true, team_name: data.team_name });
  }

  // --- CHECK SLUG (real-time uniqueness check) ---
  if (body.action === "check_slug") {
    const slug = typeof body.slug === "string" ? body.slug.trim().toLowerCase() : "";
    if (!slug) return json({ error: "slug_required" }, 400);

    const { data } = await db
      .from("teams")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    return json({ available: !data });
  }

  // --- SETUP (create team with user-chosen slug and passcode) ---
  if (body.action === "setup") {
    const token = typeof body.token === "string" ? body.token.trim() : "";
    const slug = typeof body.slug === "string" ? body.slug.trim().toLowerCase() : "";
    const passcode = typeof body.passcode === "string" ? body.passcode.trim() : "";

    if (!token || !slug || !passcode) {
      return json({ error: "token, slug, and passcode are required" }, 400);
    }

    if (slug.length < 3 || slug.length > 32 || !/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(slug)) {
      return json({ error: "invalid_slug" }, 400);
    }
    if (passcode.length < 4) {
      return json({ error: "passcode_too_short" }, 400);
    }

    // Validate token
    const { data: tokenRow, error: tokenErr } = await db
      .from("setup_tokens")
      .select("id, team_name, licence_end_date, used")
      .eq("token", token)
      .single();

    if (tokenErr || !tokenRow) return json({ error: "invalid_token" }, 404);
    if (tokenRow.used) return json({ error: "token_used" }, 410);

    // Check slug uniqueness
    const { data: existing } = await db
      .from("teams")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) return json({ error: "slug_taken" }, 409);

    // Create team
    const { error: insertErr } = await db
      .from("teams")
      .insert({
        team_name: tokenRow.team_name,
        slug,
        passcode,
        licence_end_date: tokenRow.licence_end_date,
        is_active: true,
      });

    if (insertErr) return json({ error: insertErr.message }, 500);

    // Mark token as used
    await db.from("setup_tokens").update({ used: true }).eq("id", tokenRow.id);

    return json({ success: true, slug });
  }

  return json({ error: "unknown_action" }, 400);
});
