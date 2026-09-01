import { Link } from "@tanstack/react-router";
import { PackageOpen } from "lucide-react";

export function EmptyState({
  title,
  text = "There is nothing here yet.",
}: {
  title: string;
  text?: string;
}) {
  return (
    <div className="glass-panel rounded-3xl px-6 py-16 text-center">
      <PackageOpen className="mx-auto size-10 text-offer" />
      <h2 className="mt-4 font-display text-3xl text-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-mute">{text}</p>
      <Link
        to="/products"
        className="mt-6 inline-flex rounded-full bg-brand px-5 py-3 text-sm font-bold text-primary-foreground"
      >
        Explore appliances
      </Link>
    </div>
  );
}
