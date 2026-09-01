import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: false,

  tanstackStart: {
    prerender: {
      enabled: true,
      autoSubfolderIndex: true,
      autoStaticPathsDiscovery: true,
      crawlLinks: true,
      concurrency: 14,
      failOnError: true,
    },

    pages: [
      { path: "/" },
      { path: "/products" },
      { path: "/cart" },
      { path: "/checkout" },
      { path: "/compare" },
      { path: "/wishlist" },
      { path: "/order-success" },
    ],
  },

  vite: {
    base: "/technofenatics-ui/",
  },
});