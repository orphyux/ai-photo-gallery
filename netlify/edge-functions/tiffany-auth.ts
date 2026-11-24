// Username/password gate for the HCUCC Tiffany windows pages.
// The credentials are NOT stored here (this repo is public). Netlify holds an
// env var TIFFANY_AUTH_SHA256 = sha256 hex of "username:password".
// To change the login: set a new hash in Netlify env vars and redeploy.
import type { Config } from "@netlify/edge-functions";

const challenge = () =>
  new Response("Login required for the HCUCC Tiffany Windows project.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="HCUCC Tiffany Windows", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default async (request: Request) => {
  const expected = (Netlify.env.get("TIFFANY_AUTH_SHA256") ?? "").trim().toLowerCase();
  // Fail closed: if the secret is missing, nobody gets in.
  if (!expected) return challenge();

  const header = request.headers.get("authorization") ?? "";
  if (!header.toLowerCase().startsWith("basic ")) return challenge();

  let decoded: string;
  try {
    const bytes = Uint8Array.from(atob(header.slice(6).trim()), (c) => c.charCodeAt(0));
    decoded = new TextDecoder().decode(bytes);
  } catch {
    return challenge();
  }

  if ((await sha256Hex(decoded)) !== expected) return challenge();
  // Authorized: continue to the static page.
};

export const config: Config = {
  path: [
    "/hcucc-tiffany-windows",
    "/hcucc-tiffany-windows/*",
    "/holmdel-tiffany-windows",
    "/holmdel-tiffany-windows/*",
  ],
};
