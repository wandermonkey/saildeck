"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { SESSION_COOKIE, SESSION_DAYS, createSession, verifySession } from "@/lib/admin/auth";
import { getAdminByUsername, createAdminUser, deleteAdminUser } from "@/lib/admin/store";
import { verifyPassword } from "@/lib/admin/password";
import { createAdminBooking, createBlock, cancelBooking } from "@/lib/booking/store";

/** Middleware already guards /admin, but server actions are public endpoints
 *  in their own right, so each one checks the session again. Returns the
 *  signed-in admin's user id. */
export async function requireAdmin(): Promise<string> {
  const jar = await cookies();
  const userId = await verifySession(jar.get(SESSION_COOKIE)?.value);
  if (!userId) redirect("/admin/login");
  return userId;
}

const text = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

export async function login(_: string | null, fd: FormData): Promise<string | null> {
  const username = text(fd, "username").toLowerCase();
  const password = text(fd, "password");
  if (!username || !password) return "Enter a username and password.";

  const user = await getAdminByUsername(username);
  if (!user || !verifyPassword(password, user.passwordHash, user.passwordSalt)) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return "That username or password is not right.";
  }

  const jar = await cookies();
  jar.set(SESSION_COOKIE, await createSession(user.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86_400,
  });

  const next = text(fd, "next");
  redirect(next.startsWith("/admin/") ? next : "/admin/calendar");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function addAdminUser(_: string | null, fd: FormData): Promise<string | null> {
  await requireAdmin();
  const username = text(fd, "username");
  const password = text(fd, "password");
  if (!username || password.length < 8) return "Username and an 8+ character password are required.";
  try {
    await createAdminUser(username, password);
  } catch (err) {
    return err instanceof Error ? err.message : "Could not create that admin.";
  }
  revalidatePath("/admin/users");
  return null;
}

export async function removeAdminUser(id: string) {
  await requireAdmin();
  try {
    await deleteAdminUser(id);
  } catch (err) {
    console.error("Could not remove admin:", err);
  }
  revalidatePath("/admin/users");
}

export async function bookForCustomer(fd: FormData) {
  const adminId = await requireAdmin();
  await createAdminBooking({
    yachtSlug: text(fd, "yachtSlug"),
    yachtName: text(fd, "yachtName"),
    bookingDate: text(fd, "bookingDate"),
    slotId: text(fd, "slotId"),
    basePrice: Number(text(fd, "basePrice") || 0),
    customerName: text(fd, "customerName"),
    customerPhone: text(fd, "customerPhone"),
    customerEmail: text(fd, "customerEmail"),
    comment: text(fd, "comment"),
    adminId,
  });
  revalidatePath("/admin/calendar");
}

export async function blockSlotAction(fd: FormData) {
  const adminId = await requireAdmin();
  await createBlock({
    yachtSlug: text(fd, "yachtSlug"),
    yachtName: text(fd, "yachtName"),
    bookingDate: text(fd, "bookingDate"),
    slotId: text(fd, "slotId"),
    reason: text(fd, "reason") || "Blocked",
    adminId,
  });
  revalidatePath("/admin/calendar");
}

export async function cancelBookingAction(id: string) {
  await requireAdmin();
  await cancelBooking(id);
  revalidatePath("/admin/calendar");
}
