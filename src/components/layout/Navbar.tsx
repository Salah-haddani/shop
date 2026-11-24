"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { siteConfig } from "@/config/site";
import { allCategories } from "@/lib/products";
import { strings } from "@/lib/strings";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // Close mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/produits/?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery("");
      }
    },
    [router, searchQuery]
  );

  const isActive = (href: string) => {
    if (href === "/produits/") return pathname.startsWith("/produits");
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isCategoryActive = (slug: string) =>
    pathname === `/categories/${slug}/`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* ── TOP BAR: logo centred, À propos + Contact top-right ── */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center relative">

          {/* Logo — absolutely centred */}
          <Link
            href="/"
            aria-label={siteConfig.name}
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center leading-none group"
          >
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={200}
              height={60}
              className="h-[60px] w-[200px] object-contain"
              priority
            />
          </Link>

          {/* Mobile hamburger (far right) */}
          <button
            className="lg:hidden ml-auto p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? strings.general.close : "Menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── BOTTOM BAR: categories + Tous les produits + search ── */}
      <div className="hidden lg:block border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 h-11">

            {/* Tous les produits */}
            <Link
              href="/produits/"
              className={`px-4 h-full flex items-center text-sm font-semibold tracking-wide transition-colors border-b-2 ${
                isActive("/produits/") && !pathname.startsWith("/categories/")
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-600 hover:text-primary hover:border-primary/40"
              }`}
            >
              {strings.nav.products}
            </Link>

            {/* Category tabs */}
            <nav aria-label="Catégories" className="flex items-center gap-0 h-full">
              {allCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}/`}
                  className={`px-4 h-full flex items-center text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                    isCategoryActive(cat.slug)
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 hover:text-primary hover:border-primary/40"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>

            {/* Search bar pushed to the right */}
            <form
              onSubmit={handleSearch}
              role="search"
              className="ml-auto flex items-center"
            >
              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={strings.nav.search}
                  aria-label={strings.nav.search}
                  className="w-52 xl:w-64 rounded-full border border-gray-200 bg-gray-50 pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </form>

          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-gray-100 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            {/* Mobile search */}
            <form onSubmit={handleSearch} role="search" className="mb-1">
              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={strings.nav.search}
                  aria-label={strings.nav.search}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </form>

            <Link
              href="/produits/"
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive("/produits/") && !pathname.startsWith("/categories/")
                  ? "text-primary bg-primary/10"
                  : "text-gray-700 hover:text-primary hover:bg-gray-50"
              }`}
            >
              {strings.nav.products}
            </Link>

            {allCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}/`}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isCategoryActive(cat.slug)
                    ? "text-primary bg-primary/10"
                    : "text-gray-700 hover:text-primary hover:bg-gray-50"
                }`}
              >
                {cat.name}
              </Link>
            ))}

          </div>
        </div>
      )}
    </header>
  );
}
