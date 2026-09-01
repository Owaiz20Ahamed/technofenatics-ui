import { Link } from "@tanstack/react-router";
import { Check, Heart, Scale, Star } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export function ProductCard({ product, list = false }: { product: Product; list?: boolean }) {
  const { wishlist, compare, toggleWishlist, toggleCompare, addToCart, viewProduct } = useStore();
  const saved = wishlist.includes(product.id);
  const compared = compare.includes(product.id);
  return (
    <article
      className={`group glass-panel overflow-hidden rounded-2xl p-3 transition-transform duration-300 hover:-translate-y-1 ${list ? "flex gap-4" : ""}`}
    >
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        onClick={() => viewProduct(product.id)}
        className={list ? "w-40 shrink-0" : "block"}
      >
        <div
          className={`relative overflow-hidden rounded-xl bg-ice ${list ? "aspect-square" : "aspect-[0.94]"}`}
        >
          <img
            src={product.image}
            alt={`${product.brand} ${product.name}`}
            width={900}
            height={900}
            loading="lazy"
            className="product-image group-hover-product-image h-full w-full object-cover"
          />
          <span className="absolute left-2 top-2 rounded-full bg-offer px-2 py-1 text-[10px] font-bold text-primary-foreground">
            {product.discount}% OFF
          </span>
        </div>
      </Link>
      <div className="min-w-0 flex-1 pt-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-mute">
              {product.brand}
            </p>
            <Link
              to="/product/$id"
              params={{ id: product.id }}
              onClick={() => viewProduct(product.id)}
              className="mt-1 block line-clamp-2 text-sm font-semibold leading-snug text-ink hover:text-brand"
            >
              {product.name}
            </Link>
          </div>
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`grid size-8 shrink-0 place-items-center rounded-full border border-border ${saved ? "bg-offer/10 text-offer" : "text-mute hover:bg-muted"}`}
            aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`size-4 ${saved ? "fill-current" : ""}`} />
          </button>
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs text-mute">
          <Star className="size-3.5 fill-offer text-offer" /> {product.rating}{" "}
          <span className="text-mute/70">({product.ratingCount.toLocaleString("en-IN")})</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-ink">{formatPrice(product.price)}</span>
          <span className="text-xs text-mute line-through">{formatPrice(product.mrp)}</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-mute">
          <span className="flex items-center gap-1 text-success">
            <Check className="size-3" /> Free delivery
          </span>
          <span>{product.warranty}</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => addToCart(product.id)}
            className="min-w-0 flex-1 rounded-xl bg-brand px-3 py-2.5 text-xs font-bold text-primary-foreground hover:bg-brand/90"
          >
            Add to cart
          </button>
          <button
            onClick={() => toggleCompare(product.id)}
            className={`grid size-10 shrink-0 place-items-center rounded-xl border ${compared ? "border-brand bg-brand/10 text-brand" : "border-border text-mute hover:bg-muted"}`}
            aria-label={compared ? "Remove from comparison" : "Compare product"}
          >
            <Scale className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProductRail({
  title,
  products,
  eyebrow,
}: {
  title: string;
  products: Product[];
  eyebrow?: string;
}) {
  return (
    <section className="py-6">
      <div className="mb-4 flex items-end justify-between">
        <div>
          {eyebrow ? (
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-offer">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-1 font-display text-3xl text-ink">{title}</h2>
        </div>
        <Link to="/products" className="text-sm font-semibold text-brand hover:text-offer">
          View all →
        </Link>
      </div>
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0">
        {products.map((product) => (
          <div key={product.id} className="w-[260px] shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
