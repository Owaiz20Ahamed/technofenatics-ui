import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, CreditCard, MapPin, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { formatPrice } from "@/lib/catalog";
import { useStore } from "@/lib/store";
export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — ONDC Appliances" },
      {
        name: "description",
        content: "Complete your appliance order with delivery and payment details.",
      },
      { property: "og:title", content: "Checkout — ONDC Appliances" },
      {
        property: "og:description",
        content: "Complete your appliance order with delivery and payment details.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});
function CheckoutPage() {
  const navigate = useNavigate();
  const { cartProducts, clearCart, notify } = useStore();
  const [payment, setPayment] = useState("UPI");
  const subtotal = cartProducts.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const discount = cartProducts.reduce(
    (sum, line) => sum + (line.product.mrp - line.product.price) * line.quantity,
    0,
  );
  const total = subtotal >= 4999 ? subtotal : subtotal + 99;
  const placeOrder = () => {
    clearCart();
    notify("Order placed successfully");
    navigate({ to: "/order-success" });
  };
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm font-semibold text-mute hover:text-brand"
        >
          <ArrowLeft className="size-4" /> Back to cart
        </Link>
        {cartProducts.length ? (
          <>
            <div className="mt-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-offer">
                Secure checkout
              </p>
              <h1 className="mt-2 font-display text-5xl text-ink">One last step.</h1>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
              <div className="grid gap-4">
                <section className="glass-panel rounded-3xl p-5 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-brand text-sm font-bold text-primary-foreground">
                      1
                    </span>
                    <div>
                      <h2 className="text-lg font-bold text-ink">Delivery address</h2>
                      <p className="text-xs text-mute">
                        Your appliance will arrive at your doorstep.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border-2 border-brand/30 bg-brand/5 p-4">
                      <div className="flex items-start justify-between">
                        <MapPin className="size-5 text-offer" />
                        <Check className="size-4 text-success" />
                      </div>
                      <p className="mt-3 text-sm font-bold text-ink">Home</p>
                      <p className="mt-1 text-xs leading-relaxed text-mute">
                        24, 3rd Cross, Indiranagar
                        <br />
                        Bengaluru, Karnataka 560038
                      </p>
                    </div>
                    <button className="rounded-2xl border border-dashed border-border p-4 text-left text-sm font-semibold text-mute hover:bg-muted">
                      + Add another address
                    </button>
                  </div>
                </section>
                <section className="glass-panel rounded-3xl p-5 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-brand text-sm font-bold text-primary-foreground">
                      2
                    </span>
                    <div>
                      <h2 className="text-lg font-bold text-ink">Payment method</h2>
                      <p className="text-xs text-mute">Choose how you’d like to pay.</p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {["UPI", "Credit / Debit Card", "Net Banking", "Cash on Delivery"].map(
                      (method) => (
                        <label
                          key={method}
                          className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 text-sm font-semibold ${payment === method ? "border-brand bg-brand/5 text-brand" : "border-border text-ink"}`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method}
                            checked={payment === method}
                            onChange={(event) => setPayment(event.target.value)}
                            className="accent-brand"
                          />
                          <CreditCard className="size-4" />
                          {method}
                        </label>
                      ),
                    )}
                  </div>
                </section>
              </div>
              <aside className="glass-panel h-fit rounded-3xl p-5 lg:sticky lg:top-32">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-success" />
                  <span className="text-sm font-bold text-ink">Order summary</span>
                </div>
                <div className="mt-5 grid gap-3 border-b border-border pb-5 text-sm">
                  <div className="flex justify-between text-mute">
                    <span>Items ({cartProducts.length})</span>
                    <span className="font-semibold text-ink">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-mute">
                    <span>Discount</span>
                    <span className="font-semibold text-success">−{formatPrice(discount)}</span>
                  </div>
                  <div className="flex justify-between text-mute">
                    <span>Delivery</span>
                    <span className="font-semibold text-success">
                      {subtotal >= 4999 ? "Free" : "₹99"}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-lg font-bold text-ink">
                  <span>Grand total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <button
                  onClick={placeOrder}
                  className="mt-6 w-full rounded-xl bg-brand py-3.5 text-sm font-bold text-primary-foreground hover:bg-brand/90"
                >
                  Place order <Check className="ml-1 inline size-4" />
                </button>
                <p className="mt-3 text-center text-xs text-mute">
                  No real payment is processed in this demo.
                </p>
              </aside>
            </div>
          </>
        ) : (
          <div className="glass-panel mt-8 rounded-3xl px-6 py-16 text-center">
            <h2 className="font-display text-3xl text-ink">Your cart is empty.</h2>
            <Link
              to="/products"
              className="mt-5 inline-flex rounded-full bg-brand px-5 py-3 text-sm font-bold text-primary-foreground"
            >
              Browse appliances
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
