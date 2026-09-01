import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { EmptyState } from "@/components/EmptyState";
import { formatPrice } from "@/lib/catalog";
import { useStore } from "@/lib/store";
export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — ONDC Appliances" },
      { name: "description", content: "Review your appliance order and continue to delivery." },
      { property: "og:title", content: "Cart — ONDC Appliances" },
      {
        property: "og:description",
        content: "Review your appliance order and continue to delivery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});
function CartPage() {
  const { cartProducts, updateQuantity, removeFromCart } = useStore();
  const subtotal = cartProducts.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const mrp = cartProducts.reduce((sum, line) => sum + line.product.mrp * line.quantity, 0);
  const discount = mrp - subtotal;
  const delivery = subtotal >= 4999 || subtotal === 0 ? 0 : 99;
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-mute hover:text-brand"
        >
          <ArrowLeft className="size-4" /> Continue shopping
        </Link>
        {cartProducts.length ? (
          <>
            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-offer">
                  Your bag / {cartProducts.length} lines
                </p>
                <h1 className="mt-2 font-display text-5xl text-ink">Ready when you are.</h1>
              </div>
              <ShoppingBag className="size-8 text-offer" />
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
              <section className="grid gap-3">
                {cartProducts.map(({ product, quantity }) => (
                  <article key={product.id} className="glass-panel flex gap-4 rounded-2xl p-4">
                    <img
                      src={product.image}
                      alt={`${product.brand} ${product.name}`}
                      width={180}
                      height={180}
                      className="size-28 shrink-0 rounded-xl object-cover sm:size-36"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-mute">
                            {product.brand}
                          </p>
                          <Link
                            to="/product/$id"
                            params={{ id: product.id }}
                            className="mt-1 block line-clamp-2 text-sm font-bold text-ink"
                          >
                            {product.name}
                          </Link>
                        </div>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="grid size-9 shrink-0 place-items-center rounded-full text-mute hover:bg-offer/10 hover:text-offer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <div className="mt-4 flex items-end justify-between gap-3">
                        <div className="flex items-center rounded-xl border border-border bg-background">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="grid size-9 place-items-center text-mute hover:bg-muted"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-ink">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="grid size-9 place-items-center text-mute hover:bg-muted"
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <span className="text-lg font-bold text-ink">
                          {formatPrice(product.price * quantity)}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
              <aside className="glass-panel h-fit rounded-3xl p-5 lg:sticky lg:top-32">
                <h2 className="font-display text-3xl text-ink">Order summary</h2>
                <div className="mt-5 grid gap-3 border-b border-border pb-5 text-sm">
                  <div className="flex justify-between text-mute">
                    <span>Subtotal</span>
                    <span className="font-semibold text-ink">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-mute">
                    <span>Discount</span>
                    <span className="font-semibold text-success">−{formatPrice(discount)}</span>
                  </div>
                  <div className="flex justify-between text-mute">
                    <span>Delivery</span>
                    <span className="font-semibold text-success">
                      {delivery ? formatPrice(delivery) : "Free"}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-base font-bold text-ink">
                  <span>Total</span>
                  <span>{formatPrice(subtotal + delivery)}</span>
                </div>
                <Link
                  to="/checkout"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-primary-foreground"
                >
                  Proceed to checkout <Check className="size-4" />
                </Link>
                <p className="mt-3 text-center text-xs text-mute">
                  Free delivery on orders over ₹4,999
                </p>
              </aside>
            </div>
          </>
        ) : (
          <div className="mt-8">
            <EmptyState
              title="Your cart is empty."
              text="Add a few dependable upgrades and they’ll appear here."
            />
          </div>
        )}
      </main>
    </div>
  );
}
