import { Link } from "react-router-dom";
import Container from "./ui/Container";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Products", path: "/products" },
  { label: "Media", path: "/media" },
  { label: "Contact", path: "/contact" },
];

const productLinks = [
  { label: "General Products", path: "/products/general" },
  { label: "Agro Commodities", path: "/products/agro-commodities" },
  { label: "Vehicles & Machinery", path: "/products/vehicles-machinery" },
  { label: "Woods & Wood Products", path: "/products/woods-wood-products" },
  { label: "Kids Clothing", path: "/products/kids-clothing" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#080808]">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(201,151,58,0.03),transparent_60%)]" />

      <Container className="relative py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Logo + tagline + social */}
          <div>
            <img
              src="/logo.png"
              alt="Link United International"
              className="mb-5 h-12 w-auto"
              style={{ filter: "drop-shadow(0 0 8px rgba(201,151,58,0.3))" }}
            />
            <p className="font-display text-sm italic text-zinc-500">
              Connecting with signature of trust
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition hover:border-gold-400/30 hover:text-gold-200"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition hover:border-gold-400/30 hover:text-gold-200"
                aria-label="Twitter"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition hover:border-gold-400/30 hover:text-gold-200"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="gold-text mb-5 text-xs font-bold uppercase tracking-[0.2em]">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    className="text-sm text-zinc-400 transition-colors duration-300 hover:text-gold-200"
                    to={item.path}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Product Categories */}
          <div>
            <h4 className="gold-text mb-5 text-xs font-bold uppercase tracking-[0.2em]">
              Product Categories
            </h4>
            <ul className="space-y-3">
              {productLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    className="text-sm text-zinc-400 transition-colors duration-300 hover:text-gold-200"
                    to={item.path}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Office Addresses */}
          <div>
            <h4 className="gold-text mb-5 text-xs font-bold uppercase tracking-[0.2em]">
              Global Offices
            </h4>
            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold text-zinc-200">London, UK</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  LiNK UNITED INTERNATIONAL LIMITED
                  <br />
                  66 Paul Street, London EC2A 4NE
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-200">Houston, USA</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  LiNK UNITED INTERNATIONAL INC.
                  <br />
                  700 Louisiana Street, Suite 3950
                  <br />
                  Houston, TX 77002
                </p>
              </div>
              <a
                href="mailto:info@linkunited.co.uk"
                className="inline-block text-sm text-gold-200/80 transition hover:text-gold-200"
              >
                info@linkunited.co.uk
              </a>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-zinc-800/50 py-6">
        <Container>
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-zinc-600 md:flex-row">
            <p>
              &copy; {new Date().getFullYear()} Link United International&reg; — All Rights Reserved
            </p>
            <p className="flex items-center gap-2">
              Registered in England &amp; Wales
              <span className="inline-block h-1 w-1 rounded-full bg-gold-400/40" />
              Connecting with signature of trust
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
