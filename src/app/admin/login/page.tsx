import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next = "" } = await searchParams;
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-white p-7 shadow-[var(--shadow-card)]">
        <p className="text-xs font-semibold uppercase tracking-wider text-crimson">Saildeck</p>
        <h1 className="mt-2 font-display text-3xl">Booking calendar</h1>
        <p className="mt-2 text-sm text-muted">Staff only. Sign in with your admin account to continue.</p>
        <LoginForm next={next} />
      </div>
    </div>
  );
}
