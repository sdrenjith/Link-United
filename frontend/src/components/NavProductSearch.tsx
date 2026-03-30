import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { productsService, type ProductSearchHit } from "../services/products.service";
import { productCategoryPath } from "../utils/productCategoryPath";
import type { ProductCategory } from "../types/api";

const CATEGORY_SUGGESTIONS: { name: string; path: string; desc: string }[] = [
  {
    name: "Agro products",
    path: "/products/agro-commodities",
    desc: "Spices, grains, oils & agricultural raw materials",
  },
  {
    name: "Kids wear",
    path: "/products/kids-clothing",
    desc: "Quality children's apparel for international retail",
  },
  {
    name: "General commodities",
    path: "/products/general",
    desc: "Consumer electronics, appliances & industrial essentials",
  },
  {
    name: "Wood & wood furniture",
    path: "/products/woods-wood-products",
    desc: "Premium timber from certified global producers",
  },
  {
    name: "Vehicle & machinery",
    path: "/products/vehicles-machinery",
    desc: "Heavy equipment, vehicles & industrial machinery",
  },
];

function useDebounced<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), ms);
    return () => window.clearTimeout(t);
  }, [value, ms]);
  return debounced;
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  try {
    const parts = text.split(new RegExp(`(${escapeRegExp(q)})`, "ig"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === q.toLowerCase() ? (
            <mark key={i} className="rounded bg-gold-400/25 px-0.5 text-inherit">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </>
    );
  } catch {
    return <>{text}</>;
  }
}

type Props = {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
  /** Desktop: false when the nav bar is transparent over the hero (lighter search field). */
  opaqueHeader?: boolean;
};

export default function NavProductSearch({
  variant,
  onNavigate,
  opaqueHeader = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<ProductSearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const debounced = useDebounced(query, 160);

  const categoryMatches = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return [];
    return CATEGORY_SUGGESTIONS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.path.toLowerCase().includes(q),
    ).slice(0, 6);
  }, [debounced]);

  useEffect(() => {
    const q = debounced.trim();
    if (!q) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const ac = new AbortController();
    setLoading(true);
    productsService
      .search(q, ac.signal)
      .then((items) => {
        setProducts(items);
      })
      .catch((err: unknown) => {
        if (axios.isCancel(err)) return;
        setProducts([]);
      })
      .finally(() => {
        if (!ac.signal.aborted) setLoading(false);
      });

    return () => ac.abort();
  }, [debounced]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const showPanel = open && debounced.trim().length > 0;
  const hasResults = categoryMatches.length > 0 || products.length > 0;
  const desktop = variant === "desktop";
  const blendWithHero = desktop && !opaqueHeader;

  const handlePick = useCallback(() => {
    setOpen(false);
    setQuery("");
    onNavigate?.();
  }, [onNavigate]);

  return (
    <div
      ref={rootRef}
      className={
        desktop
          ? "relative hidden w-[min(100%,188px)] max-w-full shrink-0 self-center lg:block lg:w-[196px] xl:w-[216px] 2xl:w-60"
          : "relative w-full px-1"
      }
    >
      <label className="sr-only" htmlFor={desktop ? "nav-product-search" : "nav-product-search-mobile"}>
        Search products and categories
      </label>
      <div className="relative">
        <span
          className={`pointer-events-none absolute left-2.5 top-1/2 z-[1] -translate-y-1/2 ${
            blendWithHero ? "text-white/85 [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.85))]" : "text-gold-500/50"
          }`}
          aria-hidden
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
          </svg>
        </span>
        <input
          ref={inputRef}
          id={desktop ? "nav-product-search" : "nav-product-search-mobile"}
          type="search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Search products…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className={`w-full rounded-lg border font-body outline-none transition focus:ring-1 focus:ring-gold-400/25 ${
            blendWithHero
              ? "h-10 border-white/45 bg-black/50 py-0 pl-9 pr-9 text-xs leading-none tracking-wide text-white shadow-[0_1px_3px_rgba(0,0,0,0.65)] placeholder:text-white/75 focus:border-white/60 focus:bg-black/60 focus:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12),0_2px_12px_rgba(0,0,0,0.4)]"
              : desktop
                ? "h-10 border-gold-400/35 bg-[#0c0c0c]/92 py-0 pl-9 pr-9 text-xs leading-none tracking-wide text-zinc-100 shadow-inner placeholder:text-zinc-600 focus:border-gold-400/60"
                : "border-white/[0.08] bg-[#0c0c0c]/92 py-2.5 pl-10 pr-10 text-sm text-zinc-100 shadow-inner placeholder:text-zinc-600 focus:border-gold-400/40"
          }`}
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            className={`absolute top-1/2 z-[1] -translate-y-1/2 rounded-md p-1 transition hover:bg-white/10 ${
              blendWithHero ? "text-white/80 hover:text-white" : "text-zinc-500 hover:text-zinc-300"
            } ${desktop ? "right-1.5" : "right-2"}`}
            onClick={() => {
              setQuery("");
              setProducts([]);
              inputRef.current?.focus();
            }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`absolute left-0 right-0 z-[130] mt-2 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c0c] shadow-[0_24px_80px_rgba(0,0,0,0.85)] ${
              desktop ? "max-h-[min(70vh,420px)]" : "max-h-[50vh]"
            } flex flex-col`}
            role="listbox"
            aria-label="Search suggestions"
          >
            <div className="custom-scrollbar flex-1 overflow-y-auto overscroll-contain p-2">
              {loading && (
                <div className="flex items-center gap-2 px-3 py-3 text-xs text-zinc-500">
                  <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border border-gold-400/40 border-t-transparent" />
                  Searching…
                </div>
              )}

              {!loading && !hasResults && (
                <p className="px-3 py-4 text-center text-sm text-zinc-500">No matches for that term.</p>
              )}

              {categoryMatches.length > 0 && (
                <div className="mb-1">
                  <p className="gold-text px-3 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-[0.2em]">
                    Categories
                  </p>
                  <ul className="space-y-0.5">
                    {categoryMatches.map((c) => (
                      <li key={c.path}>
                        <Link
                          to={c.path}
                          onClick={handlePick}
                          className="flex flex-col rounded-xl px-3 py-2.5 transition hover:bg-white/[0.05]"
                          role="option"
                        >
                          <span className="text-sm font-medium text-zinc-100">
                            <Highlight text={c.name} query={debounced} />
                          </span>
                          <span className="mt-0.5 line-clamp-1 text-xs text-zinc-500">{c.desc}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {products.length > 0 && (
                <div className={categoryMatches.length > 0 ? "mt-2 border-t border-white/[0.06] pt-2" : ""}>
                  <p className="gold-text px-3 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-[0.2em]">
                    Products
                  </p>
                  <ul className="space-y-0.5">
                    {products.map((p) => {
                      const base = productCategoryPath(p.category as ProductCategory);
                      const to = `${base}#product-${p.id}`;
                      return (
                        <li key={p.id}>
                          <Link
                            to={to}
                            onClick={handlePick}
                            className="flex gap-3 rounded-xl px-2 py-2 transition hover:bg-white/[0.05]"
                            role="option"
                          >
                            {p.imageUrl ? (
                              <img
                                src={p.imageUrl}
                                alt=""
                                className="h-12 w-12 shrink-0 rounded-lg object-cover ring-1 ring-white/10"
                              />
                            ) : (
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-zinc-800/80 text-[10px] text-zinc-500">
                                —
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-zinc-100">
                                <Highlight text={p.name} query={debounced} />
                              </p>
                              {p.subCategory && (
                                <p className="gold-text truncate text-[11px] opacity-80">{p.subCategory}</p>
                              )}
                              {p.shortDescription && (
                                <p className="mt-0.5 line-clamp-2 text-xs text-zinc-500">{p.shortDescription}</p>
                              )}
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
