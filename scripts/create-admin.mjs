import { createClient } from "@libsql/client";
import { randomBytes, randomUUID, pbkdf2Sync } from "node:crypto";
import { mkdirSync } from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";

/**
 * Creates (or resets) an admin login directly against the booking database.
 * This exists because there's a chicken-and-egg problem: the in-app
 * "/admin/users" page can add more admins, but only once someone is already
 * signed in — this script bootstraps the very first one. Run it with:
 *
 *   node scripts/create-admin.mjs
 *   node scripts/create-admin.mjs <username> <password>   (non-interactive)
 *
 * It reads the same TURSO_DATABASE_URL / TURSO_AUTH_TOKEN env vars as the
 * app (export them first, or run via `vercel env pull && node -r dotenv/config
 * scripts/create-admin.mjs` / similar), falling back to the local
 * .data/booking.db file used by `npm run dev` otherwise.
 *
 * Password hashing (PBKDF2, same parameters as src/lib/admin/password.ts)
 * is duplicated here rather than imported, since this script runs as plain
 * Node outside Next's TypeScript build.
 */

const ITERATIONS = 100_000;
const KEYLEN = 64;
const DIGEST = "sha512";

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST).toString("hex");
  return { hash, salt };
}

function connect() {
  const url = process.env.TURSO_DATABASE_URL;
  if (url) return createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
  const dir = path.join(process.cwd(), ".data");
  mkdirSync(dir, { recursive: true });
  return createClient({ url: `file:${path.join(dir, "booking.db")}` });
}

async function main() {
  const client = connect();
  await client.execute(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id            TEXT PRIMARY KEY,
      username      TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      created_at    INTEGER NOT NULL
    )
  `);

  let [, , argUsername, argPassword] = process.argv;
  let username = argUsername?.trim().toLowerCase();
  let password = argPassword;

  if (!username || !password) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    username = (await rl.question("Admin username: ")).trim().toLowerCase();
    password = await rl.question("Admin password (min 8 characters): ");
    rl.close();
  }

  if (!username || password.length < 8) {
    console.error("Need a username and an 8+ character password.");
    process.exit(1);
  }

  const existing = await client.execute({ sql: "SELECT id FROM admin_users WHERE username = ?", args: [username] });
  const { hash, salt } = hashPassword(password);

  if (existing.rows[0]) {
    await client.execute({
      sql: "UPDATE admin_users SET password_hash = ?, password_salt = ? WHERE username = ?",
      args: [hash, salt, username],
    });
    console.log(`Password reset for existing admin "${username}".`);
  } else {
    await client.execute({
      sql: "INSERT INTO admin_users (id, username, password_hash, password_salt, created_at) VALUES (?,?,?,?,?)",
      args: [randomUUID(), username, hash, salt, Date.now()],
    });
    console.log(`Admin "${username}" created. Sign in at /admin/login.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
