import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ChevronDown, Heart, Minus, Plus, Scale, ShieldCheck, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { ProductCard, ProductRail } from "@/components/ProductCard";
import { formatPrice, getProduct, products } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.brand} ${loaderData.name} — ONDC Appliances`
          : "Product details — ONDC Appliances",
      },
      {
        name: "description",
        content: loaderData?.description ?? "Explore appliance details, delivery and warranty.",
      },
      { property: "og:title", content: loaderData?.name ?? "Product details — ONDC Appliances" },
      {
        property: "og:description",
        content: loaderData?.description ?? "Explore appliance details, delivery and warranty.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});
function ProductPage() {
  const product = Route.useLoaderData();
  const {
    addToCart,
    toggleWishlist,
    toggleCompare,
    wishlist,
    compare,
    viewProduct,
    recentProducts,
  } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("Highlights");
  const saved = wishlist.includes(product.id);
  const compared = compare.includes(product.id);
  useEffect(() => viewProduct(product.id), [product.id, viewProduct]);
  const similar = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 5);
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-mute">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products" search={{ category: product.category }}>
            {product.category}
          </Link>
          <span>/</span>
          <span>{product.brand}</span>
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div className="glass-panel overflow-hidden rounded-3xl p-4">
            <div className="overflow-hidden rounded-2xl bg-ice">
              <img
                src={product.image}
                alt={`${product.brand} ${product.name}`}
                width={900}
                height={900}
                className="aspect-square w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[product.image, product.image, product.image, product.image].map((image, index) => (
                <button
                  key={index}
                  className={`overflow-hidden rounded-xl border-2 ${index === 0 ? "border-brand" : "border-transparent"}`}
                  aria-label={`View product image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt=""
                    width={180}
                    height={180}
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="py-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-offer">
                  {product.brand}
                </p>
                <h1 className="mt-2 max-w-[18ch] font-display text-5xl leading-[0.96] text-ink">
                  {product.name}
                </h1>
              </div>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`grid size-11 shrink-0 place-items-center rounded-full border ${saved ? "border-offer bg-offer/10 text-offer" : "border-border text-mute hover:bg-muted"}`}
                aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`size-5 ${saved ? "fill-current" : ""}`} />
              </button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-mute">
              <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 font-bold text-success">
                <Star className="size-3.5 fill-current" /> {product.rating}
              </span>
              <span>{product.ratingCount.toLocaleString("en-IN")} ratings</span>
              <span className="size-1 rounded-full bg-border" />
              <span>{product.energyRating}</span>
            </div>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-ink">{formatPrice(product.price)}</span>
              <span className="text-base text-mute line-through">{formatPrice(product.mrp)}</span>
              <span className="rounded-full bg-offer/10 px-2 py-1 text-xs font-bold text-offer">
                {product.discount}% off
              </span>
            </div>
            <p className="mt-2 text-xs text-mute">Inclusive of all taxes</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background/50 p-4">
                <ShieldCheck className="size-5 text-success" />
                <p className="mt-2 text-sm font-bold text-ink">{product.warranty}</p>
                <p className="mt-1 text-xs text-mute">Manufacturer coverage</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/50 p-4">
                <Check className="size-5 text-success" />
                <p className="mt-2 text-sm font-bold text-ink">Delivery {product.deliveryDate}</p>
                <p className="mt-1 text-xs text-mute">Free doorstep delivery</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-xl border border-border bg-background">
                <button
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="grid size-11 place-items-center text-mute hover:bg-muted"
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-ink">{quantity}</span>
                <button
                  onClick={() => setQuantity((current) => current + 1)}
                  className="grid size-11 place-items-center text-mute hover:bg-muted"
                  aria-label="Increase quantity"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <button
                onClick={() => addToCart(product.id, quantity)}
                className="flex-1 rounded-xl bg-brand px-5 py-3.5 text-sm font-bold text-primary-foreground hover:bg-brand/90 sm:flex-none"
              >
                Add to cart
              </button>
              <button
                onClick={() => toggleCompare(product.id)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3.5 text-sm font-bold ${compared ? "border-brand bg-brand/10 text-brand" : "border-border text-ink hover:bg-muted"}`}
              >
                <Scale className="size-4" /> Compare
              </button>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-mute">{product.description}</p>
          </div>
        </div>
        <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.38fr]">
          <div className="glass-panel rounded-3xl p-5 sm:p-7">
            <div className="flex flex-wrap gap-2 border-b border-border pb-3">
              {[
                "Highlights",
                "Specifications",
                "Warranty",
                "Delivery & Returns",
                "Reviews",
                "FAQs",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setTab(item)}
                  className={`rounded-full px-3 py-2 text-sm font-semibold ${tab === item ? "bg-brand text-primary-foreground" : "text-mute hover:bg-muted"}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="pt-6">
              {tab === "Highlights" ? (
                <ul className="grid gap-3 sm:grid-cols-3">
                  {product.highlights.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl bg-muted/50 p-4 text-sm font-semibold text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : tab === "Specifications" ? (
                <div className="grid divide-y divide-border rounded-2xl border border-border">
                  {[
                    ["Capacity", product.capacity],
                    ["Energy rating", product.energyRating],
                    ["Brand", product.brand],
                    ["Category", product.category],
                  ].map(([label, value]) => (
                    <div key={label} className="grid grid-cols-2 gap-4 px-4 py-3 text-sm">
                      <span className="text-mute">{label}</span>
                      <span className="font-semibold text-ink">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl bg-muted/50 p-5 text-sm leading-relaxed text-mute">
                  {tab === "Warranty"
                    ? `This appliance includes ${product.warranty}, with support from the manufacturer.`
                    : tab === "Reviews"
                      ? `Rated ${product.rating} out of 5 from ${product.ratingCount.toLocaleString("en-IN")} verified shoppers.`
                      : tab === "FAQs"
                        ? "Need installation help? Delivery partners coordinate a convenient slot after checkout."
                        : "Free delivery is available in Bengaluru and selected serviceable pin codes. Easy returns apply to eligible items."}
                </div>
              )}
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-brand p-6 text-primary-foreground">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground/60">
              Shop with clarity
            </p>
            <h2 className="mt-3 font-display text-3xl">Better details. Better decisions.</h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
              Save this product, compare it with two others, or add it to your cart when you’re
              ready.
            </p>
          </div>
        </section>
        <ProductRail title="Similar products" products={similar} />
        <ProductRail
          title="Recently viewed"
          products={recentProducts.filter((item) => item.id !== product.id).slice(0, 5)}
        />
      </main>
    </div>
  );
}
