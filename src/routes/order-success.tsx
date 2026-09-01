import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, PackageCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
export const Route = createFileRoute("/order-success")({
  head: () => ({
    meta: [
      { title: "Order confirmed — ONDC Appliances" },
      { name: "description", content: "Your ONDC Appliances order has been placed successfully." },
      { property: "og:title", content: "Order confirmed — ONDC Appliances" },
      {
        property: "og:description",
        content: "Your ONDC Appliances order has been placed successfully.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrderSuccessPage,
});
function OrderSuccessPage() {
  const [orderId, setOrderId] = useState("#ONDC—");
  useEffect(() => setOrderId(`#ONDC${Date.now().toString().slice(-6)}`), []);
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="glass-panel rounded-[28px] px-6 py-12 text-center sm:px-12">
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-success/10 text-success">
            <div className="grid size-12 place-items-center rounded-full bg-success text-primary-foreground">
              <Check className="size-7" />
            </div>
          </div>
          <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.18em] text-success">
            Payment demo complete
          </p>
          <h1 className="mt-3 font-display text-5xl text-ink">Order placed successfully</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mute">
            Thank you for choosing a better everyday. We’ll coordinate doorstep delivery and
            installation with you.
          </p>
          <div className="mx-auto mt-8 grid max-w-sm divide-y divide-border rounded-2xl border border-border bg-background/50 text-left">
            <div className="flex items-center justify-between p-4 text-sm">
              <span className="text-mute">Order ID</span>
              <span className="font-bold text-ink">{orderId}</span>
            </div>
            <div className="flex items-center justify-between p-4 text-sm">
              <span className="text-mute">Estimated delivery</span>
              <span className="font-bold text-ink">2–4 business days</span>
            </div>
            <div className="flex items-center gap-3 p-4 text-sm">
              <PackageCheck className="size-5 text-offer" />
              <span className="font-semibold text-ink">
                Updates will be shared in your order history.
              </span>
            </div>
          </div>
          <Link
            to="/products"
            className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    </div>
  );
}
