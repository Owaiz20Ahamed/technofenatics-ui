import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, MapPin, Menu, Package, Search, ShoppingBag, X } from "lucide-react";
import { categories, products } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export function AppHeader() {
  const navigate = useNavigate();
  const { cartCount, wishlist, searches, saveSearch } = useStore();
  const [term, setTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const suggestions = term.trim()
    ? products
        .filter((product) =>
          product.tags.some((tag) => tag.toLowerCase().includes(term.toLowerCase())),
        )
        .slice(0, 4)
    : [];
  const submitSearch = (value = term) => {
    const clean = value.trim();
    if (!clean) return;
    saveSearch(clean);
    navigate({ to: "/products", search: { q: clean } });
    setTerm(clean);
  };
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-glass backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3">
            <Link
              to="/"
              className="flex min-w-0 shrink-0 items-center gap-2.5"
              aria-label="ONDC Appliances home"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand text-sm font-bold text-primary-foreground ring-1 ring-brand/20">
                O
              </span>
              <span className="hidden leading-none sm:block">
                <span className="block text-sm font-bold text-ink">ONDC SuperApp</span>
                <span className="mt-1 block text-[11px] font-medium text-mute">Appliances</span>
              </span>
            </Link>
            <div className="relative mx-auto w-full max-w-xl">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  submitSearch();
                }}
                className="flex h-11 items-center gap-2 rounded-full border border-border bg-background/60 px-4 shadow-sm focus-within:ring-2 focus-within:ring-ring/30"
              >
                <Search className="size-4 shrink-0 text-mute" aria-hidden="true" />
                <input
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  placeholder="Search appliances, brands or categories"
                  className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-mute/70"
                  aria-label="Search appliances"
                />
                <button
                  type="submit"
                  className="hidden rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-primary-foreground sm:block"
                >
                  Search
                </button>
              </form>
              {(suggestions.length > 0 || (!term && searches.length > 0)) && (
                <div className="glass-panel absolute left-0 right-0 top-14 z-50 overflow-hidden rounded-2xl p-2">
                  {suggestions.length ? (
                    <>
                      <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-mute">
                        Matching products
                      </p>
                      {suggestions.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            setTerm(product.name);
                            submitSearch(product.name);
                          }}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-muted"
                        >
                          <img
                            src={product.image}
                            alt=""
                            className="size-9 rounded-lg object-cover"
                          />
                          <span className="min-w-0 truncate text-sm text-ink">
                            {product.brand} {product.name}
                          </span>
                        </button>
                      ))}
                    </>
                  ) : (
                    <>
                      <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-mute">
                        Recent searches
                      </p>
                      {searches.map((search) => (
                        <button
                          key={search}
                          onClick={() => submitSearch(search)}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-ink hover:bg-muted"
                        >
                          <Search className="size-3.5 text-mute" />
                          {search}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
            <nav className="flex shrink-0 items-center gap-1 sm:gap-2">
              <button
                onClick={() => setLocationOpen(true)}
                className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-mute hover:bg-muted sm:flex"
              >
                <MapPin className="size-4 text-offer" /> Bengaluru
              </button>
              <Link
                to="/wishlist"
                className="hidden size-10 place-items-center rounded-full text-mute hover:bg-muted sm:grid"
                aria-label={`Wishlist, ${wishlist.length} items`}
              >
                <Heart className="size-[18px]" />
              </Link>
              <Link
                to="/cart"
                className="relative flex items-center gap-2 rounded-full bg-brand px-3 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-brand/90"
              >
                <ShoppingBag className="size-4" />
                <span className="hidden sm:inline">Cart</span>
                <span className="grid size-5 place-items-center rounded-full bg-offer text-[11px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              </Link>
              <button
                onClick={() => setMenuOpen((open) => !open)}
                className="grid size-10 place-items-center rounded-full text-mute hover:bg-muted sm:hidden"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-4 overflow-x-auto pb-3 text-xs font-medium text-mute sm:hidden">
            <button
              onClick={() => setLocationOpen(true)}
              className="flex shrink-0 items-center gap-1"
            >
              <MapPin className="size-3.5 text-offer" /> Bengaluru
            </button>
            <Link to="/wishlist" className="flex shrink-0 items-center gap-1">
              <Heart className="size-3.5" /> Saved
            </Link>
            <Link to="/compare" className="flex shrink-0 items-center gap-1">
              <Package className="size-3.5" /> Compare
            </Link>
          </div>
          <div className="hidden items-center gap-6 overflow-x-auto border-t border-border/50 py-2 text-xs text-mute md:flex">
            <span className="font-bold uppercase tracking-[0.16em] text-brand">Aisle index</span>
            {categories.slice(0, 7).map((category) => (
              <Link
                key={category.name}
                to="/products"
                search={{ category: category.name }}
                className="shrink-0 hover:text-brand"
              >
                {category.name}
              </Link>
            ))}
            <span className="ml-auto shrink-0 text-success">● Free delivery above ₹4,999</span>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div className="fixed inset-x-0 top-[72px] z-30 border-b border-border bg-background p-4 shadow-xl sm:hidden">
          <div className="grid gap-2">
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-3 font-medium hover:bg-muted"
            >
              Browse all appliances
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-3 font-medium hover:bg-muted"
            >
              Wishlist
            </Link>
            <Link
              to="/compare"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-3 font-medium hover:bg-muted"
            >
              Compare products
            </Link>
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-3 font-medium hover:bg-muted"
            >
              Cart & checkout
            </Link>
          </div>
        </div>
      )}
      {locationOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-brand/25 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="glass-panel w-full max-w-md rounded-3xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-offer">
                  Delivery location
                </p>
                <h2 className="mt-2 font-display text-3xl text-ink">Where should we deliver?</h2>
              </div>
              <button
                onClick={() => setLocationOpen(false)}
                className="grid size-9 place-items-center rounded-full hover:bg-muted"
                aria-label="Close location selector"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-5 rounded-2xl border border-brand/20 bg-brand/5 p-4">
              <div className="flex items-center gap-3">
                <MapPin className="size-5 text-offer" />
                <div>
                  <p className="font-semibold text-ink">Bengaluru, Karnataka</p>
                  <p className="text-xs text-mute">Delivering to 560001</p>
                </div>
              </div>
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-mute">
              Recent locations
            </p>
            <div className="mt-2 grid gap-1">
              {["Mumbai, Maharashtra", "Delhi, NCR", "Hyderabad, Telangana"].map((city) => (
                <button
                  key={city}
                  onClick={() => setLocationOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-ink hover:bg-muted"
                >
                  <MapPin className="size-4 text-mute" />
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
