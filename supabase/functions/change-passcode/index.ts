// supabase/functions/change-passcode/index.ts
// =====================================================================
// Sync Scout — パスコード変更
//   ログイン済みユーザーが旧passcodeを提示して新passcodeに変更する。
//   service role で teams テーブルを更新。
//
// ▼ デプロイ
//     supabase functions deploy change-passcode --no-verify-jwt
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

function safeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  let body: { slug?: unknown; current_passcode?: unknown; new_passcode?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  const slug = typeof body.slug === "string" ? body.slug.trim().toLowerCase() : "";
  const currentPasscode = typeof body.current_passcode === "string" ? body.current_passcode.trim() : "";
  const newPasscode = typeof body.new_passcode === "string" ? body.new_passcode.trim() : "";

  if (!slug || !currentPasscode || !newPasscode) {
    return json({ error: "invalid_input" }, 400);
  }
  if (newPasscode.length < 4 || newPasscode.length > 64) {
    return json({ error: "passcode_length" }, 400);
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const { data: team, error } = await admin
    .from("teams")
    .select("id, passcode")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !team || !safeEqual(currentPasscode, team.passcode ?? "")) {
    return json({ error: "invalid_credentials" }, 401);
  }

  const { error: updateErr } = await admin
    .from("teams")
    .update({ passcode: newPasscode })
    .eq("id", team.id);

  if (updateErr) return json({ error: updateErr.message }, 500);

  return json({ ok: true });
});
