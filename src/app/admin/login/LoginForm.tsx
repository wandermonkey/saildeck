"use client";

import { useActionState } from "react";
import { login } from "../actions";

export function LoginForm({ next }: { next: string }) {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="mt-6 space-y-4">
      <input type="hidden" name="next" value={next} />
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Username</span>
        <input
          name="username"
          type="text"
          required
          autoFocus
          autoComplete="username"
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-crimson"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Password</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-crimson"
        />
      </label>
      {error && <p role="alert" className="rounded-lg bg-crimson-soft px-3 py-2 text-sm text-crimson">{error}</p>}
      <button
        disabled={pending}
        className="w-full rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white hover:bg-crimson-dark disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
