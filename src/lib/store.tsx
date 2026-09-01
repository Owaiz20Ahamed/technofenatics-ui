import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type Product } from "./catalog";

export type CartLine = { id: string; quantity: number };
export type Toast = { id: number; message: string; action?: { label: string; href: string } };

const keys = {
  cart: "ondc-cart",
  wishlist: "ondc-wishlist",
  compare: "ondc-compare",
  recent: "ondc-recent",
  searches: "ondc-searches",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    return JSON.parse(localStorage.getItem(key) ?? JSON.stringify(fallback)) as T;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(value));
}

function useStoreState() {
  const [cart, setCart] = useState<CartLine[]>(() => read(keys.cart, []));
  const [wishlist, setWishlist] = useState<string[]>(() => read(keys.wishlist, []));
  const [compare, setCompare] = useState<string[]>(() => read(keys.compare, []));
  const [recent, setRecent] = useState<string[]>(() => read(keys.recent, []));
  const [searches, setSearches] = useState<string[]>(() => read(keys.searches, []));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastSequence = useRef(0);

  useEffect(() => write(keys.cart, cart), [cart]);
  useEffect(() => write(keys.wishlist, wishlist), [wishlist]);
  useEffect(() => write(keys.compare, compare), [compare]);
  useEffect(() => write(keys.recent, recent), [recent]);
  useEffect(() => write(keys.searches, searches), [searches]);

  const notify = useCallback((message: string, action?: Toast["action"]) => {
    const id = Date.now() * 100 + (toastSequence.current++ % 100);
    setToasts((current) => [...current, action ? { id, message, action } : { id, message }]);
    window.setTimeout(
      () => setToasts((current) => current.filter((toast) => toast.id !== id)),
      3600,
    );
  }, []);
  const addToCart = useCallback(
    (id: string, quantity = 1) => {
      setCart((current) =>
        current.some((line) => line.id === id)
          ? current.map((line) =>
              line.id === id ? { ...line, quantity: line.quantity + quantity } : line,
            )
          : [...current, { id, quantity }],
      );
      const product = getProduct(id);
      if (product)
        notify(`${product.brand} ${product.name} added to cart`, {
          label: "View cart",
          href: "/cart",
        });
    },
    [notify],
  );
  const updateQuantity = useCallback(
    (id: string, quantity: number) =>
      setCart((current) =>
        quantity < 1
          ? current.filter((line) => line.id !== id)
          : current.map((line) => (line.id === id ? { ...line, quantity } : line)),
      ),
    [],
  );
  const removeFromCart = useCallback(
    (id: string) => {
      setCart((current) => current.filter((line) => line.id !== id));
      notify("Item removed from cart");
    },
    [notify],
  );
  const toggleWishlist = useCallback(
    (id: string) => {
      setWishlist((current) => {
        const exists = current.includes(id);
        notify(
          exists ? "Removed from wishlist" : "Added to wishlist",
          exists ? undefined : { label: "View wishlist", href: "/wishlist" },
        );
        return exists ? current.filter((item) => item !== id) : [...current, id];
      });
    },
    [notify],
  );
  const toggleCompare = useCallback(
    (id: string) => {
      setCompare((current) => {
        if (current.includes(id)) {
          notify("Removed from comparison");
          return current.filter((item) => item !== id);
        }
        if (current.length >= 3) {
          notify("You can compare up to 3 products");
          return current;
        }
        notify("Added to comparison", { label: "Compare now", href: "/compare" });
        return [...current, id];
      });
    },
    [notify],
  );
  const viewProduct = useCallback(
    (id: string) =>
      setRecent((current) => [id, ...current.filter((item) => item !== id)].slice(0, 6)),
    [],
  );
  const saveSearch = useCallback((term: string) => {
    const clean = term.trim();
    if (clean)
      setSearches((current) =>
        [clean, ...current.filter((item) => item.toLowerCase() !== clean.toLowerCase())].slice(
          0,
          5,
        ),
      );
  }, []);
  const clearCart = useCallback(() => setCart([]), []);
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const cartProducts = cart
    .map((line) => ({ ...line, product: getProduct(line.id) }))
    .filter((line): line is CartLine & { product: Product } => Boolean(line.product));
  const wishlistProducts = wishlist
    .map(getProduct)
    .filter((product): product is Product => Boolean(product));
  const compareProducts = compare
    .map(getProduct)
    .filter((product): product is Product => Boolean(product));
  const recentProducts = recent
    .map(getProduct)
    .filter((product): product is Product => Boolean(product));
  return {
    cart,
    cartProducts,
    cartCount,
    wishlist,
    wishlistProducts,
    compare,
    compareProducts,
    recentProducts,
    searches,
    toasts,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    toggleCompare,
    viewProduct,
    saveSearch,
    clearCart,
    notify,
  };
}

type StoreValue = ReturnType<typeof useStoreState>;
const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const value = useStoreState();
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used inside StoreProvider");
  return value;
}

export function ToastStack({ toasts }: { toasts: Toast[] }) {
  return (
    <div
      className="fixed bottom-5 right-5 z-[60] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="glass-panel animate-toast-in flex items-center justify-between gap-3 rounded-2xl bg-brand px-4 py-3 text-sm text-primary-foreground"
        >
          <span>{toast.message}</span>
          {toast.action ? (
            <a
              href={toast.action.href}
              className="shrink-0 font-semibold text-offer-soft underline underline-offset-4"
            >
              {toast.action.label}
            </a>
          ) : null}
        </div>
      ))}
    </div>
  );
}
