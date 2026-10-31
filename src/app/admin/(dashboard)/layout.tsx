import Link from "next/link";
import { logout } from "../actions";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-10 bg-navy text-white">
        <div className="container-x flex items-center justify-between py-3">
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/admin/calendar" className="font-display text-base font-semibold">
              Saildeck Admin
            </Link>
            <Link href="/admin/calendar" className="text-white/80 transition-colors hover:text-white">
              Calendar
            </Link>
            <Link href="/admin/users" className="text-white/80 transition-colors hover:text-white">
              Admins
            </Link>
          </nav>
          <form action={logout}>
            <button type="submit" className="text-sm text-white/80 transition-colors hover:text-white">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
