# ONDC Appliances Marketplace

A standalone frontend concept for the Appliances section of an ONDC SuperApp. It demonstrates a complete appliance discovery and shopping experience without requiring an API, account, payment gateway, or backend service.

## Included experience

- Editorial appliance marketplace home with hero carousel and category rail
- Search with matching suggestions and recent searches
- Product listing with category, brand, price, rating, energy, sort, and grid/list controls
- Product detail pages with highlights, specifications, warranty, delivery, reviews, FAQs, and related products
- Wishlist, three-product comparison, and persistent cart interactions
- Demo checkout with delivery address, payment selection, pricing summary, and confirmation state
- Responsive desktop/mobile layouts with generated appliance imagery

## Run locally

Requires Node.js 18+ and npm or Bun.

```sh
git clone <repository-url>
cd <repository-folder>
npm install
npm run dev
```

Open `http://localhost:3000` in a browser. The hosted preview uses port `8080`.

## Project structure

- `src/routes/` — TanStack file-based routes for home, catalog, product detail, saved items, compare, cart, checkout, and order confirmation
- `src/components/` — shared application header, product cards/rails, and empty states
- `src/lib/catalog.ts` — typed local product/category catalog and pricing helpers
- `src/lib/store.tsx` — shared client state and browser persistence
- `src/styles.css` — semantic design tokens and the translucent showroom visual system
- `src/assets/` — original generated appliance imagery and brand mark

## Demo persistence

Cart lines, wishlist items, comparison items, recently viewed products, and recent searches are stored in the browser's local storage under the `ondc-*` keys. The demo checkout clears the cart after placing an order; no real payment is processed and no order is sent to a service.

## Known integration points

The local catalog and client store are intentionally isolated so they can later be replaced with ONDC network discovery, seller inventory, authentication, delivery serviceability, payment, and order APIs.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS v4
- Lucide React