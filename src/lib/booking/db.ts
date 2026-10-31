import "server-only";
import { createClient, type Client } from "@libsql/client";
import { mkdirSync } from "node:fs";
import path from "node:path";

/**
 * Booking database.
 *
 * libSQL is SQLite with a network mode, so the same code runs against a
 * local file in development (`.data/booking.db`, created automatically,
 * gitignored) and against Turso in production. Vercel's filesystem is
 * read-only and per-request, so production MUST have TURSO_DATABASE_URL set
 * — without it, bookings and the availability calendar would vanish, and we
 * refuse rather than pretend to save.
 */

const SCHEMA = `
CREATE TABLE IF NOT EXISTS bookings (
  id                   TEXT PRIMARY KEY,
  yacht_slug           TEXT NOT NULL,
  yacht_name           TEXT NOT NULL,
  booking_date         TEXT NOT NULL,
  slot_id              TEXT NOT NULL,
  slot_start           TEXT NOT NULL,
  slot_end             TEXT NOT NULL,
  base_price           INTEGER NOT NULL,
  slot_price           INTEGER NOT NULL,
  addons_json          TEXT NOT NULL DEFAULT '[]',
  addons_total         INTEGER NOT NULL DEFAULT 0,
  comment              TEXT NOT NULL DEFAULT '',
  total_price          INTEGER NOT NULL,
  deposit_amount       INTEGER NOT NULL DEFAULT 0,
  balance_amount       INTEGER NOT NULL DEFAULT 0,
  customer_name        TEXT NOT NULL DEFAULT '',
  customer_phone       TEXT NOT NULL DEFAULT '',
  customer_email       TEXT NOT NULL DEFAULT '',
  status               TEXT NOT NULL,
  hold_expires_at      INTEGER,
  razorpay_order_id    TEXT NOT NULL DEFAULT '',
  razorpay_payment_id  TEXT NOT NULL DEFAULT '',
  source               TEXT NOT NULL DEFAULT 'website',
  created_by_admin_id  TEXT NOT NULL DEFAULT '',
  block_reason         TEXT NOT NULL DEFAULT '',
  created_at           INTEGER NOT NULL,
  updated_at           INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS bookings_yacht_date ON bookings (yacht_slug, booking_date);
CREATE INDEX IF NOT EXISTS bookings_status ON bookings (status);

CREATE TABLE IF NOT EXISTS admin_users (
  id            TEXT PRIMARY KEY,
  username      TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  created_at    INTEGER NOT NULL
);
`;

let ready: Promise<Client> | null = null;

function connect(): Client {
  const url = process.env.TURSO_DATABASE_URL;
  if (url) return createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });

  if (process.env.VERCEL) {
    throw new Error(
      "TURSO_DATABASE_URL is not set. Bookings cannot be stored on Vercel's filesystem — see .env.example → Booking system."
    );
  }

  const dir = path.join(process.cwd(), ".data");
  mkdirSync(dir, { recursive: true });
  return createClient({ url: `file:${path.join(dir, "booking.db")}` });
}

/** Connects once per server instance and makes sure the tables exist. */
export function db(): Promise<Client> {
  if (!ready) {
    ready = (async () => {
      const client = connect();
      await client.executeMultiple(SCHEMA);
      return client;
    })();
    // A failed connect should be retried on the next request, not cached.
    ready.catch(() => (ready = null));
  }
  return ready;
}
