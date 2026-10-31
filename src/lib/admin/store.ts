import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "@/lib/booking/db";
import { hashPassword } from "./password";

export type AdminUser = {
  id: string;
  username: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: number;
};

function toUser(r: Record<string, unknown>): AdminUser {
  return {
    id: String(r.id),
    username: String(r.username),
    passwordHash: String(r.password_hash),
    passwordSalt: String(r.password_salt),
    createdAt: Number(r.created_at),
  };
}

export async function getAdminByUsername(username: string): Promise<AdminUser | null> {
  const client = await db();
  const res = await client.execute({
    sql: `SELECT * FROM admin_users WHERE username = ?`,
    args: [username.trim().toLowerCase()],
  });
  return res.rows[0] ? toUser(res.rows[0] as Record<string, unknown>) : null;
}

export async function getAdminById(id: string): Promise<AdminUser | null> {
  const client = await db();
  const res = await client.execute({ sql: `SELECT * FROM admin_users WHERE id = ?`, args: [id] });
  return res.rows[0] ? toUser(res.rows[0] as Record<string, unknown>) : null;
}

export async function listAdminUsers(): Promise<AdminUser[]> {
  const client = await db();
  const res = await client.execute(`SELECT * FROM admin_users ORDER BY created_at ASC`);
  return res.rows.map((r) => toUser(r as Record<string, unknown>));
}

export async function createAdminUser(username: string, password: string): Promise<string> {
  const client = await db();
  const existing = await getAdminByUsername(username);
  if (existing) throw new Error("That username is already taken.");

  const { hash, salt } = hashPassword(password);
  const id = randomUUID();
  await client.execute({
    sql: `INSERT INTO admin_users (id, username, password_hash, password_salt, created_at) VALUES (?,?,?,?,?)`,
    args: [id, username.trim().toLowerCase(), hash, salt, Date.now()],
  });
  return id;
}

export async function deleteAdminUser(id: string): Promise<void> {
  const client = await db();
  const remaining = await listAdminUsers();
  if (remaining.length <= 1) throw new Error("Can't remove the last admin account.");
  await client.execute({ sql: `DELETE FROM admin_users WHERE id = ?`, args: [id] });
}
