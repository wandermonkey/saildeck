import "server-only";
import { randomBytes, pbkdf2Sync, timingSafeEqual } from "node:crypto";

/** PBKDF2 rather than bcrypt/argon2 so this needs no new native dependency —
 *  Node's built-in crypto is enough for a small admin user table. */
const ITERATIONS = 100_000;
const KEYLEN = 64;
const DIGEST = "sha512";

export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST).toString("hex");
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const candidate = pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST);
  const expected = Buffer.from(hash, "hex");
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}
