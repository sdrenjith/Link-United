import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll to `#product-{id}` when present (e.g. after nav search). */
export function useScrollToProductHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    const id = hash.replace(/^#/, "");
    if (!id.startsWith("product-")) return;
    const run = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    const t = window.setTimeout(run, 120);
    return () => window.clearTimeout(t);
  }, [hash, pathname]);
}
