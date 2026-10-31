"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/booking/CartProvider";
import { ADDONS, ADDONS_DISCLAIMER } from "@/lib/booking/addons";
import { inr } from "@/data/yachts";
import { ArrowIcon } from "@/components/icons";

export default function CartPage() {
  const { items, removeItem, setAddons, setComment, itemTotal, grandTotal, depositTotal, balanceTotal } = useCart();
  const router = useRouter();

  function toggleAddon(cartId: string, currentIds: string[], addonId: string) {
    const next = currentIds.includes(addonId) ? currentIds.filter((id) => id !== addonId) : [...currentIds, addonId];
    setAddons(cartId, ADDONS.filter((a) => next.includes(a.id)));
  }

  return (
    <>
      <div className="border-b border-line bg-white">
        <div className="container-x py-10 md:py-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-faint">
              <li><Link href="/" className="transition-colors hover:text-crimson">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-muted">Cart</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl md:text-[2.4rem]">Your cart</h1>
          <p className="mt-2 max-w-xl text-muted">Add on anything you&apos;d like, then head to checkout.</p>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container-x">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-line bg-white p-10 text-center">
              <p className="text-muted">Your cart is empty.</p>
              <Link
                href="/fleet"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-crimson-dark"
              >
                Browse the fleet <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
              <div className="space-y-5 lg:col-span-2">
                {items.map((item) => {
                  const addonIds = item.addons.map((a) => a.id);
                  return (
                    <div key={item.cartId} className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)]">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="font-display text-lg font-semibold text-navy">{item.yachtName}</h2>
                          <p className="mt-1 text-sm text-muted">
                            {new Date(item.bookingDate + "T00:00:00").toLocaleDateString("en-IN", {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}{" "}
                            · {item.slotLabel}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-display text-lg font-semibold text-navy">{inr(itemTotal(item))}</p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.cartId)}
                            className="mt-1 text-xs text-crimson hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="mt-5 border-t border-line pt-5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Add-ons</p>
                        <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {ADDONS.map((addon) => (
                            <label
                              key={addon.id}
                              className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs text-ink"
                            >
                              <input
                                type="checkbox"
                                checked={addonIds.includes(addon.id)}
                                onChange={() => toggleAddon(item.cartId, addonIds, addon.id)}
                                className="h-3.5 w-3.5 accent-[var(--color-crimson)]"
                              />
                              <span>
                                {addon.label}
                                {addon.price > 0 && <span className="text-faint"> (+{inr(addon.price)})</span>}
                              </span>
                            </label>
                          ))}
                        </div>
                        <p className="mt-2 text-[11px] leading-relaxed text-faint">{ADDONS_DISCLAIMER}</p>
                      </div>

                      <label className="mt-4 block">
                        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
                          Anything else we should organise?
                        </span>
                        <textarea
                          value={item.comment}
                          onChange={(e) => setComment(item.cartId, e.target.value)}
                          rows={2}
                          placeholder="e.g. a specific cake flavour, a particular song list for the DJ, dietary needs…"
                          className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-crimson"
                        />
                      </label>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)]">
                <h2 className="font-display text-lg font-semibold text-navy">Order summary</h2>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted">Total</dt>
                    <dd className="font-medium text-navy">{inr(grandTotal)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-line pt-2">
                    <dt className="text-muted">Deposit due now (50%)</dt>
                    <dd className="font-semibold text-navy">{inr(depositTotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Balance due on the day</dt>
                    <dd className="text-muted">{inr(balanceTotal)}</dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={() => router.push("/checkout")}
                  data-cta="cart-checkout"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-crimson px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-crimson-dark"
                >
                  Proceed to checkout <ArrowIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
