import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, CircleCheck, MapPin, Sparkles } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { ProductRail } from "@/components/ProductCard";
import { categories, products } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import heroImage from "@/assets/hero-cooling.jpg";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ONDC Appliances — Everyday upgrades, delivered" },
      {
        name: "description",
        content:
          "Shop trusted appliances with clear specs, quick delivery and a thoughtful ONDC marketplace experience.",
      },
      { property: "og:title", content: "ONDC Appliances — Everyday upgrades, delivered" },
      {
        property: "og:description",
        content:
          "Shop trusted appliances with clear specs, quick delivery and a thoughtful ONDC marketplace experience.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { recentProducts } = useStore();
  const [slide, setSlide] = useState(0);
  const slides: [
    {
      label: string;
      title: string;
      body: string;
      cta: string;
      category: "Air Conditioners" | "Kitchen Appliances" | "Washing Machines";
    },
    {
      label: string;
      title: string;
      body: string;
      cta: string;
      category: "Air Conditioners" | "Kitchen Appliances" | "Washing Machines";
    },
    {
      label: string;
      title: string;
      body: string;
      cta: string;
      category: "Air Conditioners" | "Kitchen Appliances" | "Washing Machines";
    },
  ] = [
    {
      label: "Summer cooling sale",
      title: "Upgrade your home, one quiet machine at a time.",
      body: "Inverter ACs, front-load washers and energy-rated cooling from brands your city actually trusts.",
      cta: "Shop cooling",
      category: "Air Conditioners",
    },
    {
      label: "Kitchen edit",
      title: "Make room for a better everyday.",
      body: "Small rituals, upgraded — from quick breakfasts to weeknight feasts.",
      cta: "Explore kitchen",
      category: "Kitchen Appliances",
    },
    {
      label: "Smart savings",
      title: "The appliances that earn their place.",
      body: "Compare energy ratings, warranty coverage and real value in one clear view.",
      cta: "Shop best sellers",
      category: "Washing Machines",
    },
  ];
  useEffect(() => {
    const timer = window.setInterval(
      () => setSlide((current) => (current + 1) % slides.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [slides.length]);
  const active = slides[slide] ?? slides[0];
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="py-6 sm:py-8">
          <div className="glass-panel overflow-hidden rounded-[24px]">
            <div className="grid items-stretch lg:grid-cols-[1.05fr_1fr]">
              <div className="flex flex-col justify-center gap-5 p-6 sm:p-10 lg:p-14">
                <span className="w-fit rounded-full bg-offer/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-offer animate-hero-in">
                  {active.label}
                </span>
                <h1
                  key={slide}
                  className="max-w-[16ch] font-display text-5xl leading-[0.94] text-ink animate-hero-in sm:text-6xl"
                >
                  {active.title}
                </h1>
                <p
                  key={`${slide}-body`}
                  className="max-w-[43ch] text-base leading-relaxed text-mute animate-hero-in"
                >
                  {active.body}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/products"
                    search={{ category: active.category }}
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-brand/90"
                  >
                    {active.cta}
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    to="/products"
                    className="inline-flex items-center rounded-full border border-border bg-background/60 px-5 py-3 text-sm font-bold text-ink hover:bg-background"
                  >
                    Browse all
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-mute">
                  <span>1,200+ appliances</span>
                  <span className="size-1 rounded-full bg-mute/40" />
                  <span>Free delivery above ₹4,999</span>
                </div>
              </div>
              <div className="relative min-h-[320px] bg-ice lg:min-h-0">
                <img
                  src={heroImage}
                  alt="White split air conditioner in a cool daylight room"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
                  <div className="rounded-2xl bg-background/85 px-4 py-3 shadow-lg backdrop-blur-md">
                    <p className="text-[11px] font-medium text-mute">Vael 1.5T Inverter AC</p>
                    <p className="text-base font-bold text-ink">
                      ₹38,990{" "}
                      <span className="text-xs font-medium text-mute line-through">₹46,500</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setSlide((current) => (current - 1 + slides.length) % slides.length)
                      }
                      className="grid size-10 place-items-center rounded-full bg-background/85 text-ink shadow-lg backdrop-blur-md"
                      aria-label="Previous promotion"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <button
                      onClick={() => setSlide((current) => (current + 1) % slides.length)}
                      className="grid size-10 place-items-center rounded-full bg-background/85 text-ink shadow-lg backdrop-blur-md"
                      aria-label="Next promotion"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-4">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-offer">
                Aisle index
              </p>
              <h2 className="mt-1 font-display text-3xl text-ink">Shop by category</h2>
            </div>
            <Link to="/products" className="text-sm font-semibold text-brand">
              View all <ArrowRight className="ml-1 inline size-4" />
            </Link>
          </div>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
            {categories.map((category) => (
              <Link
                key={category.name}
                to="/products"
                search={{ category: category.name }}
                className="group w-[142px] shrink-0 overflow-hidden rounded-2xl border border-border bg-glass shadow-sm transition hover:-translate-y-1 hover:border-brand/30"
              >
                <div
                  className={`aspect-square overflow-hidden ${category.tone === "warm" ? "bg-offer-soft" : "bg-ice"}`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    width={900}
                    height={900}
                    loading="lazy"
                    className="product-image group-hover-product-image h-full w-full object-cover"
                  />
                </div>
                <div className="px-3 py-2.5">
                  <p className="text-sm font-semibold leading-tight text-ink">{category.name}</p>
                  <p className="mt-1 text-[11px] text-mute">{category.count} items</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="py-6">
          <div className="flex flex-col items-start justify-between gap-4 overflow-hidden rounded-3xl bg-brand px-6 py-6 text-primary-foreground sm:flex-row sm:items-center sm:px-8">
            <div className="flex items-center gap-4">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary-foreground/10">
                <Sparkles className="size-6 text-offer-soft" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground/60">
                  Deal of the day
                </p>
                <p className="mt-1 font-display text-2xl">
                  Up to 32% off inverter cooling, ends tonight.
                </p>
              </div>
            </div>
            <Link
              to="/products"
              search={{ category: "Air Conditioners" }}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary-foreground px-5 py-3 text-sm font-bold text-brand"
            >
              Shop the deal <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
        <ProductRail
          eyebrow="Section (a)"
          title="Best sellers"
          products={products.filter((product) => product.rating >= 4.5).slice(0, 6)}
        />
        <ProductRail
          eyebrow="Section (b)"
          title="Trending appliances"
          products={products.slice(10, 16)}
        />
        {recentProducts.length > 0 ? (
          <ProductRail
            eyebrow="Picked up where you left off"
            title="Recently viewed"
            products={recentProducts}
          />
        ) : (
          <section className="mb-12 rounded-3xl border border-dashed border-border bg-background/40 px-6 py-8">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 size-5 text-offer" />
              <div>
                <h2 className="font-display text-2xl text-ink">Delivery, the way it should be.</h2>
                <p className="mt-1 text-sm text-mute">
                  Choose a product to start building your recently viewed shelf. Every item comes
                  with clear delivery and warranty details.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-success">
                  <span className="flex items-center gap-1">
                    <CircleCheck className="size-3.5" /> Doorstep delivery
                  </span>
                  <span className="flex items-center gap-1">
                    <CircleCheck className="size-3.5" /> Easy comparison
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
