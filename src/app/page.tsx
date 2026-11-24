import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  MessageCircle,
  Star,
  Truck,
  Shield,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { strings } from "@/lib/strings";
import { getFeaturedProducts, getNewArrivals, allCategories } from "@/lib/products";
import { getWhatsAppBaseUrl } from "@/lib/whatsapp";
import ProductCard from "@/components/product/ProductCard";

const whyIcons = [Star, Truck, RefreshCw, Shield];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals(4);
  const whatsappUrl = getWhatsAppBaseUrl();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      {/*
        BANNER PLACEHOLDER
        ──────────────────
        Replace the <div> below (className="hero-banner-placeholder …")
        with a Next.js <Image fill …> pointing to your banner photo.

        Example:
          import heroBanner from "@/public/images/hero-banner.jpg";
          <Image src={heroBanner} alt="…" fill className="object-cover" priority />

        The parent already has position:relative and the overlay layer
        on top of it, so your image will sit naturally behind the text.
      */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center">

        <Image
                 src="/images/hero-banner.jpg"
                 alt="Bannière Élégance Maroc"
                 fill
                 className="object-cover object-center"
                 priority
               />

        {/* Overlay — strong enough to guarantee white text legibility over any photo */}
        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
          <div className="max-w-xl">
            <p className="text-accent font-semibold tracking-widest text-sm uppercase mb-3">
              Nouvelle Collection
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-white whitespace-pre-line">
              {strings.home.heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-white/80 mb-10 leading-relaxed">
              {strings.home.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/produits/"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full hover:bg-primary-dark transition-colors shadow-md"
              >
                <ShoppingBag size={17} aria-hidden="true" />
                {strings.home.heroCtaShop}
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-gray-800 font-semibold px-7 py-3.5 rounded-full hover:bg-gray-50 border border-gray-200 transition-colors shadow-sm"
              >
                <MessageCircle size={17} aria-hidden="true" />
                {strings.home.heroCtaWhatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {strings.home.categoriesTitle}
              </h2>
              <p className="text-gray-400 mt-1 text-sm">{strings.home.categoriesSubtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {allCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}/`}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-sm sm:text-base tracking-wide">
                    {cat.name}
                  </h3>
                  <span className="text-white/70 text-xs group-hover:text-white transition-colors">
                    Découvrir →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────── */}
      <section className="py-14 bg-[#fdf5f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {strings.home.featuredTitle}
              </h2>
              <p className="text-gray-500 mt-1 text-sm">{strings.home.featuredSubtitle}</p>
            </div>
            <Link
              href="/produits/"
              className="hidden sm:flex items-center gap-1 text-primary font-medium text-sm hover:gap-2 transition-all"
            >
              {strings.general.viewAll}
              <ChevronRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-7 sm:hidden text-center">
            <Link
              href="/produits/"
              className="inline-flex items-center gap-1 text-primary font-medium text-sm"
            >
              {strings.general.viewAll}
              <ChevronRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ─────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {strings.home.newArrivalsTitle}
              </h2>
              <p className="text-gray-400 mt-1 text-sm">{strings.home.newArrivalsSubtitle}</p>
            </div>
            <Link
              href="/categories/nouveautes/"
              className="hidden sm:flex items-center gap-1 text-primary font-medium text-sm hover:gap-2 transition-all"
            >
              {strings.general.viewAll}
              <ChevronRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────── */}
      <section className="py-14 bg-[#fdf5f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {strings.home.whyTitle}
            </h2>
            <p className="text-gray-500 mt-2 text-sm">{strings.home.whySubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {strings.home.whyPoints.map((point, i) => {
              const Icon = whyIcons[i];
              return (
                <div
                  key={i}
                  className="text-center p-6 rounded-2xl bg-white border border-primary/10 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-13 h-13 rounded-full bg-primary/10 mb-4 p-3">
                    <Icon size={24} className="text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{point.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{point.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA ─────────────────────────────────────────── */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/60 text-xs uppercase tracking-widest mb-3">Commander facilement</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            {strings.home.ctaBannerTitle}
          </h2>
          <p className="text-white/75 text-base mb-8 max-w-md mx-auto leading-relaxed">
            {strings.home.ctaBannerSubtitle}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white text-primary font-bold px-8 py-4 rounded-full hover:bg-pink-50 transition-colors shadow-lg text-sm tracking-wide"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {strings.home.ctaBannerButton}
          </a>
        </div>
      </section>
    </>
  );
}
