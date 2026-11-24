import { Suspense } from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { strings } from "@/lib/strings";
import { allProducts, allCategories } from "@/lib/products";
import ProductFilters from "@/components/search/ProductFilters";
import ProductListClient from "@/components/search/ProductListClient";

export const metadata: Metadata = {
  title: strings.products.title,
  description: strings.products.subtitle,
};

export default function ProduitsPage() {
  const maxPrice = Math.max(...allProducts.map((p) => p.price));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          {strings.products.title}
        </h1>
        <p className="text-gray-500 mt-2">{strings.products.subtitle}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar filters */}
        <aside className="w-full lg:w-72 shrink-0">
          <Suspense fallback={<div className="h-96 bg-gray-100 rounded-2xl animate-pulse" />}>
            <ProductFilters
              categories={allCategories}
              maxPrice={maxPrice}
            />
          </Suspense>
        </aside>

        {/* Product list */}
        <div className="flex-1 min-w-0">
          <Suspense
            fallback={
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            }
          >
            <ProductListClient products={allProducts} maxPrice={maxPrice} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
