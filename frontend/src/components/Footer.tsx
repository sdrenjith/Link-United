import { Link } from "react-router-dom";
import Container from "./ui/Container";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Products", path: "/products" },
  { label: "Our Brands", path: "/our-brands" },
  { label: "Media", path: "/media" },
  { label: "Contact", path: "/contact" },
];

const productLinks = [
  { label: "Agro products", path: "/products/agro-commodities" },
  { label: "Kids wear", path: "/products/kids-clothing" },
  { label: "General commodities", path: "/products/general" },
  { label: "Wood & wood furniture", path: "/products/woods-wood-products" },
  { label: "Vehicle & machinery", path: "/products/vehicles-machinery" },
];

const COPYRIGHT_LINE =
  "© 2026 LINK UNITED INTERNATIONAL LIMITED-UK & USA- All Rights Reserved";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#080808]">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(201,151,58,0.03),transparent_60%)]" />

      <Container className="relative py-20">
        {/* Flex row on lg: all columns share one top edge (logo lines up with h4s). Grid on md/sm caused uneven baselines. */}
        <div className="flex flex-col items-stretch gap-12 md:flex-row md:flex-wrap md:items-start md:justify-between md:gap-x-10 md:gap-y-12 lg:flex-nowrap lg:items-start lg:gap-x-8 xl:gap-x-12">
          {/* Col 1: logo + icons share a w-fit stack so icons center under the logo bitmap (incl. transparent padding) */}
          <div className="flex w-full min-w-0 flex-col items-start justify-start text-left md:basis-[calc(50%-1.25rem)] md:max-w-none md:order-4 lg:order-4 lg:basis-0 lg:flex-1">
            <div className="flex w-fit max-w-full flex-col items-center gap-3">
              <Link
                to="/"
                className="block w-fit shrink-0 leading-none outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
              >
                <img
                  src="/images/home-sliders/1774387434398-156804251-link-united-logo.png"
                  alt="Link United International"
                  className="block h-28 w-auto max-w-[min(100%,260px)] object-contain object-center sm:h-32 md:h-36"
                  style={{ filter: "drop-shadow(0 0 8px rgba(201,151,58,0.4))" }}
                />
              </Link>
              <div className="flex w-full shrink-0 justify-center gap-3" aria-label="Social links">
                <a
                  href="https://www.facebook.com/linkunitedonline"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition hover:border-gold-400/30 hover:text-gold-400"
                  aria-label="Facebook"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/linkunited_international?igsh=Z20wOHE2eWMxOGFy&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition hover:border-gold-400/30 hover:text-gold-400"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="min-w-0 w-full text-left md:basis-[calc(50%-1.25rem)] md:order-1 lg:order-1 lg:basis-0 lg:flex-1">
            <h4 className="gold-text mb-5 text-sm font-bold uppercase tracking-[0.2em]">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    className="text-base text-zinc-400 transition-colors duration-300 hover:text-gold-400"
                    to={item.path}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Product Categories */}
          <div className="min-w-0 w-full text-left md:basis-[calc(50%-1.25rem)] md:order-2 lg:order-2 lg:basis-0 lg:flex-1">
            <h4 className="gold-text mb-5 text-sm font-bold uppercase tracking-[0.2em]">
              Product Categories
            </h4>
            <ul className="space-y-3">
              {productLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    className="text-base text-zinc-400 transition-colors duration-300 hover:text-gold-400"
                    to={item.path}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Office Addresses */}
          <div className="min-w-0 w-full text-left md:basis-[calc(50%-1.25rem)] md:order-3 lg:order-3 lg:basis-0 lg:flex-1">
            <h4 className="gold-text mb-5 text-sm font-bold uppercase tracking-[0.2em]">
              Global Offices
            </h4>
            <div className="space-y-5">
              <div>
                <p className="text-base font-semibold text-zinc-200">London, UNITED KINGDOM</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                  LiNK UNITED INTERNATIONAL LIMITED
                  <br />
                  66, Paul Street
                  <br />
                  London, UNITED KINGDOM
                  <br />
                  EC2A 4NE
                </p>
              </div>
              <div>
                <p className="text-base font-semibold text-zinc-200">Houston, USA</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                  LiNK UNITED INTERNATIONAL INC.
                  <br />
                  700, Louisiana Street, Suite 3950
                  <br />
                  Houston, Texas, USA
                  <br />
                  77002
                </p>
              </div>
              <a
                href="mailto:info@linkunited.co.uk"
                className="inline-block text-base transition hover:opacity-90"
              >
                <span className="gold-text font-medium">info@linkunited.co.uk</span>
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom bar: only the copyright, centered edge-to-edge (no max-width container) */}
      <div className="border-t border-zinc-800/50 py-6">
        <p className="w-full text-center text-sm font-medium leading-relaxed text-zinc-500 sm:text-base">
          {COPYRIGHT_LINE}
        </p>
      </div>
    </footer>
  );
}
