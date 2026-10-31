"use client";

import { useActionState } from "react";
import { addAdminUser } from "../../actions";

export function AddAdminForm() {
  const [error, action, pending] = useActionState(addAdminUser, null);
  return (
    <form action={action} className="mt-4 flex flex-wrap items-end gap-3">
      <label className="block">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Username</span>
        <input name="username" required className="rounded-lg border border-line px-3 py-2 text-sm" />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Temporary password</span>
        <input name="password" type="text" required minLength={8} className="rounded-lg border border-line px-3 py-2 text-sm" />
      </label>
      <button
        disabled={pending}
        className="rounded-full bg-crimson px-5 py-2.5 text-sm font-semibold text-white hover:bg-crimson-dark disabled:opacity-60"
      >
        {pending ? "Adding…" : "Add admin"}
      </button>
      {error && <p role="alert" className="w-full rounded-lg bg-crimson-soft px-3 py-2 text-sm text-crimson">{error}</p>}
    </form>
  );
}
