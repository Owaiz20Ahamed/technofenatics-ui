import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Heart } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/lib/store";
export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — ONDC Appliances" },
      { name: "description", content: "Keep your favorite appliances close and ready to compare." },
      { property: "og:title", content: "Wishlist — ONDC Appliances" },
      {
        property: "og:description",
        content: "Keep your favorite appliances close and ready to compare.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WishlistPage,
});
function WishlistPage() {
  const { wishlistProducts } = useStore();
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
        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-offer">
              Saved for later
            </p>
            <h1 className="mt-2 font-display text-5xl text-ink">Your wishlist</h1>
            <p className="mt-2 text-sm text-mute">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? "appliance" : "appliances"}{" "}
              saved
            </p>
          </div>
          <Heart className="size-8 text-offer" />
        </div>
        <div className="mt-8">
          {wishlistProducts.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Your wishlist is empty."
              text="Save the appliances you’re considering and come back when you’re ready."
            />
          )}
        </div>
      </main>
    </div>
  );
}
