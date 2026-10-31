/**
 * Admin session: a signed, expiring cookie carrying a user id. Uses Web
 * Crypto only, so it runs in both middleware (edge) and server actions
 * (node). Unlike a single shared-password scheme, the signing secret here is
 * its own env var (`ADMIN_SESSION_SECRET`) — it has to be independent of any
 * one user's password, since there are multiple admin accounts now.
 */

export const SESSION_COOKIE = "sd_booking_admin";
export const SESSION_DAYS = 30;

const enc = new TextEncoder();

async function hmac(data: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

function secret() {
  return process.env.ADMIN_SESSION_SECRET || null;
}

export async function createSession(userId: string): Promise<string> {
  const s = secret();
  if (!s) throw new Error("ADMIN_SESSION_SECRET is not set");
  const expires = Date.now() + SESSION_DAYS * 86_400_000;
  const payload = `${userId}.${expires}`;
  return `${payload}.${await hmac(payload, s)}`;
}

/** Returns the signed-in user's id, or null if the cookie is missing,
 *  expired, or doesn't verify. */
export async function verifySession(token: string | undefined): Promise<string | null> {
  const s = secret();
  if (!s || !token) return null;
  const [userId, expires, sig] = token.split(".");
  if (!userId || !expires || !sig || Number(expires) < Date.now()) return null;
  return timingSafeEqual(sig, await hmac(`${userId}.${expires}`, s)) ? userId : null;
}

/** Compares two strings in time independent of where they first differ. */
export function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
