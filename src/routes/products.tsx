import { createFileRoute, Link } from "@tanstack/react-router";
import { Filter, Grid2X2, List, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, type Category } from "@/lib/catalog";

type SearchState = {
  q?: string | undefined;
  category?: Category | undefined;
  sort?: string | undefined;
};
export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>): SearchState => {
    const next: SearchState = {};
    const q = search["q"];
    const category = search["category"];
    const sort = search["sort"];
    if (typeof q === "string") next.q = q;
    if (typeof category === "string") next.category = category as Category;
    if (typeof sort === "string") next.sort = sort;
    return next;
  },
  head: () => ({
    meta: [
      { title: "Browse appliances — ONDC Appliances" },
      {
        name: "description",
        content: "Filter and compare appliances by category, price, rating and energy efficiency.",
      },
      { property: "og:title", content: "Browse appliances — ONDC Appliances" },
      {
        property: "og:description",
        content: "Find a better fit for every room with clear appliance shopping.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

const brands = ["LG", "Samsung", "Whirlpool", "IFB", "Bosch", "Haier", "Godrej"];
const priceRanges = [
  ["Under ₹10,000", 0, 9999],
  ["₹10,000–₹25,000", 10000, 24999],
  ["₹25,000–₹50,000", 25000, 49999],
  ["₹50,000+", 50000, Infinity],
] as const;
function ProductsPage() {
  const search = Route.useSearch();
  const [brand, setBrand] = useState<string[]>([]);
  const [price, setPrice] = useState<string[]>([]);
  const [rating, setRating] = useState("all");
  const [energy, setEnergy] = useState("all");
  const [sort, setSort] = useState(search.sort ?? "relevance");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const filtered = useMemo(() => {
    const query = search.q?.toLowerCase().trim();
    const result = products.filter(
      (product) =>
        (!search.category || product.category === search.category) &&
        (!query || product.tags.some((tag) => tag.toLowerCase().includes(query))) &&
        (!brand.length || brand.includes(product.brand)) &&
        (!price.length ||
          price.some((range) => {
            const found = priceRanges.find((item) => item[0] === range);
            return found ? product.price >= found[1] && product.price <= found[2] : false;
          })) &&
        (rating === "all" || product.rating >= Number(rating)) &&
        (energy === "all" || product.energyRating === energy),
    );
    return [...result].sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : sort === "rating"
            ? b.rating - a.rating
            : sort === "discount"
              ? b.discount - a.discount
              : 0,
    );
  }, [brand, energy, price, rating, search.category, search.q, sort]);
  const clear = () => {
    setBrand([]);
    setPrice([]);
    setRating("all");
    setEnergy("all");
    setSort("relevance");
  };
  const toggle = (values: string[], value: string, setter: (next: string[]) => void) =>
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  const filters = (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-mute">Brand</p>
        <div className="space-y-2">
          {brands.map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={brand.includes(item)}
                onChange={() => toggle(brand, item, setBrand)}
                className="size-4 accent-brand"
              />
              {item}
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-mute">Price</p>
        <div className="space-y-2">
          {priceRanges.map(([label]) => (
            <label key={label} className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={price.includes(label)}
                onChange={() => toggle(price, label, setPrice)}
                className="size-4 accent-brand"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-mute">Rating</p>
        <select
          value={rating}
          onChange={(event) => setRating(event.target.value)}
          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-ink"
        >
          <option value="all">All ratings</option>
          <option value="4">4★ & above</option>
          <option value="3">3★ & above</option>
        </select>
      </div>
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-mute">
          Energy rating
        </p>
        <select
          value={energy}
          onChange={(event) => setEnergy(event.target.value)}
          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-ink"
        >
          <option value="all">All ratings</option>
          <option>3 Star</option>
          <option>4 Star</option>
          <option>5 Star</option>
        </select>
      </div>
      <button onClick={clear} className="text-sm font-bold text-offer hover:underline">
        Clear all filters
      </button>
    </div>
  );
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-mute">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Appliances</span>
          {search.category ? (
            <>
              <span>/</span>
              <span>{search.category}</span>
            </>
          ) : null}
        </div>
        <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-offer">
              Catalog / {filtered.length} results
            </p>
            <h1 className="mt-2 font-display text-5xl text-ink">
              {search.category ?? (search.q ? `Results for “${search.q}”` : "All appliances")}
            </h1>
            <p className="mt-2 text-sm text-mute">
              Compare useful specs, trusted brands and delivery options in one place.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-semibold text-ink lg:hidden"
            >
              <Filter className="size-4" /> Filters
            </button>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-full border border-border bg-background px-4 py-2.5 text-sm font-semibold text-ink"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="low">Price: Low to high</option>
              <option value="high">Price: High to low</option>
              <option value="rating">Top rated</option>
              <option value="discount">Biggest discount</option>
            </select>
            <div className="hidden rounded-full border border-border bg-background p-1 sm:flex">
              <button
                onClick={() => setView("grid")}
                className={`grid size-8 place-items-center rounded-full ${view === "grid" ? "bg-brand text-primary-foreground" : "text-mute"}`}
                aria-label="Grid view"
              >
                <Grid2X2 className="size-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`grid size-8 place-items-center rounded-full ${view === "list" ? "bg-brand text-primary-foreground" : "text-mute"}`}
                aria-label="List view"
              >
                <List className="size-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-7 grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
          <aside className="glass-panel hidden rounded-2xl p-5 lg:block">
            <div className="mb-5 flex items-center gap-2 text-sm font-bold text-ink">
              <SlidersHorizontal className="size-4 text-offer" /> Refine your search
            </div>
            {filters}
          </aside>
          <section>
            {filtered.length ? (
              <div
                className={
                  view === "grid" ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3" : "grid gap-4"
                }
              >
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} list={view === "list"} />
                ))}
              </div>
            ) : (
              <div className="glass-panel rounded-3xl px-6 py-20 text-center">
                <Filter className="mx-auto size-9 text-offer" />
                <h2 className="mt-4 font-display text-3xl text-ink">No appliances found</h2>
                <p className="mt-2 text-sm text-mute">
                  Try clearing a filter or searching for another category.
                </p>
                <button
                  onClick={clear}
                  className="mt-5 rounded-full bg-brand px-5 py-3 text-sm font-bold text-primary-foreground"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
      {drawerOpen ? (
        <div className="fixed inset-0 z-50 bg-brand/25 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-x-0 bottom-0 max-h-[86vh] overflow-y-auto rounded-t-3xl bg-background p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-3xl text-ink">Filters</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="grid size-9 place-items-center rounded-full hover:bg-muted"
                aria-label="Close filters"
              >
                <X className="size-4" />
              </button>
            </div>
            {filters}
            <button
              onClick={() => setDrawerOpen(false)}
              className="mt-6 w-full rounded-full bg-brand py-3 text-sm font-bold text-primary-foreground"
            >
              Apply filters
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
