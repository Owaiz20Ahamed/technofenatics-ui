import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Scale, X } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { EmptyState } from "@/components/EmptyState";
import { formatPrice } from "@/lib/catalog";
import { useStore } from "@/lib/store";
export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare appliances — ONDC Appliances" },
      {
        name: "description",
        content: "Compare appliance prices, ratings, capacity, energy ratings and warranty.",
      },
      { property: "og:title", content: "Compare appliances — ONDC Appliances" },
      {
        property: "og:description",
        content: "Compare appliance prices, ratings, capacity, energy ratings and warranty.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComparePage,
});
function ComparePage() {
  const { compareProducts, toggleCompare } = useStore();
  const rows: { label: string; value: (product: (typeof compareProducts)[number]) => string }[] = [
    { label: "Price", value: (product) => formatPrice(product.price) },
    { label: "Rating", value: (product) => `${product.rating} / 5` },
    { label: "Capacity", value: (product) => product.capacity },
    { label: "Energy rating", value: (product) => product.energyRating },
    { label: "Warranty", value: (product) => product.warranty },
    { label: "Availability", value: (product) => (product.inStock ? "In stock" : "Back soon") },
  ];
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-mute hover:text-brand"
        >
          <ArrowLeft className="size-4" /> Back home
        </Link>
        <div className="mt-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-offer">
            Decision desk
          </p>
          <h1 className="mt-2 font-display text-5xl text-ink">Compare appliances</h1>
          <p className="mt-2 text-sm text-mute">
            Line up to 3 products side by side and find the right fit.
          </p>
        </div>
        {compareProducts.length ? (
          <div className="mt-8 overflow-x-auto rounded-3xl border border-border bg-background">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-44 border-b border-border p-4 text-xs font-bold uppercase tracking-[0.14em] text-mute">
                    Specification
                  </th>
                  {compareProducts.map((product) => (
                    <th key={product.id} className="border-b border-border p-4 align-top">
                      <div className="relative">
                        <button
                          onClick={() => toggleCompare(product.id)}
                          className="absolute right-0 top-0 grid size-8 place-items-center rounded-full text-mute hover:bg-muted"
                          aria-label={`Remove ${product.name} from comparison`}
                        >
                          <X className="size-4" />
                        </button>
                        <img
                          src={product.image}
                          alt={`${product.brand} ${product.name}`}
                          width={220}
                          height={220}
                          className="aspect-square w-36 rounded-2xl object-cover"
                        />
                        <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-offer">
                          {product.brand}
                        </p>
                        <Link
                          to="/product/$id"
                          params={{ id: product.id }}
                          className="mt-1 block max-w-[190px] text-sm font-bold text-ink"
                        >
                          {product.name}
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(({ label, value }) => (
                  <tr key={label} className="border-b border-border last:border-0">
                    <th className="p-4 text-sm font-medium text-mute">{label}</th>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="p-4 text-sm font-semibold text-ink">
                        {value(product)}
                        {label === "Availability" && product.inStock ? (
                          <Check className="ml-2 inline size-4 text-success" />
                        ) : null}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState
              title="Nothing to compare yet."
              text="Use the scale icon on product cards to compare up to three appliances."
            />
          </div>
        )}
      </main>
    </div>
  );
}
