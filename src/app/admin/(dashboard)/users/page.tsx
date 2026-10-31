import { listAdminUsers } from "@/lib/admin/store";
import { removeAdminUser } from "../../actions";
import { AddAdminForm } from "./AddAdminForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin accounts" };

export default async function AdminUsersPage() {
  const users = await listAdminUsers();

  return (
    <div className="container-x py-8">
      <h1 className="font-display text-2xl text-navy">Admin accounts</h1>
      <p className="mt-1 text-sm text-muted">Anyone with a login here can view and manage the booking calendar.</p>

      <div className="mt-6 rounded-2xl border border-line bg-white p-5">
        <ul className="divide-y divide-line">
          {users.map((u) => (
            <li key={u.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-navy">{u.username}</p>
                <p className="text-xs text-faint">Added {new Date(u.createdAt).toLocaleDateString("en-IN")}</p>
              </div>
              {users.length > 1 && (
                <form action={removeAdminUser.bind(null, u.id)}>
                  <button type="submit" className="text-xs font-medium text-crimson hover:underline">
                    Remove
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>

        <AddAdminForm />
      </div>
    </div>
  );
}
