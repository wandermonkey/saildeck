import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/** Thin wrapper shared by every /admin route, including login — the
 *  signed-in header chrome (nav + sign-out) lives one level down in
 *  (dashboard)/layout.tsx, so it never renders on the login page itself. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-surface text-ink">{children}</div>;
}
