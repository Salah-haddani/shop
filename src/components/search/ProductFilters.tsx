"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Search, X } from "lucide-react";
import { strings } from "@/lib/strings";
import type { Category } from "@/types";

interface ProductFiltersProps {
  categories: Category[];
  maxPrice: number;
}

export default function ProductFilters({
  categories,
  maxPrice,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const availability = searchParams.get("availability") ?? "";
  const priceMax = searchParams.get("priceMax") ?? String(maxPrice);
  const sort = searchParams.get("sort") ?? "default";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const resetFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters = q || category || availability || sort !== "default" || Number(priceMax) < maxPrice;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-5">
      {/* Search */}
      <div className="relative">
        <input
          type="search"
          value={q}
          onChange={(e) => updateParam("q", e.target.value)}
          placeholder={strings.products.searchPlaceholder}
          aria-label={strings.products.searchPlaceholder}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
          {strings.products.filterCategory}
        </label>
        <select
          value={category}
          onChange={(e) => updateParam("category", e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          aria-label={strings.products.filterCategory}
        >
          <option value="">{strings.products.filterAllCategories}</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Availability */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
          {strings.products.filterAvailability}
        </label>
        <div className="flex gap-2">
          {[
            { value: "", label: strings.products.filterAll },
            { value: "instock", label: strings.products.filterInStock },
            { value: "outofstock", label: strings.products.filterOutOfStock },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParam("availability", opt.value)}
              className={`flex-1 py-2 px-2 text-xs rounded-lg font-medium border transition-colors ${
                availability === opt.value
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <label
          htmlFor="price-range"
          className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2"
        >
          {strings.products.filterPriceRange} — max {priceMax} DH
        </label>
        <input
          id="price-range"
          type="range"
          min={0}
          max={maxPrice}
          step={10}
          value={Number(priceMax)}
          onChange={(e) => updateParam("priceMax", e.target.value)}
          className="w-full accent-primary"
          aria-label={strings.products.filterPriceRange}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0 DH</span>
          <span>{maxPrice} DH</span>
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
          {strings.products.sortLabel}
        </label>
        <select
          value={sort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          aria-label={strings.products.sortLabel}
        >
          <option value="default">{strings.products.sortOptions.default}</option>
          <option value="price-asc">{strings.products.sortOptions.priceAsc}</option>
          <option value="price-desc">{strings.products.sortOptions.priceDesc}</option>
          <option value="name-asc">{strings.products.sortOptions.nameAsc}</option>
        </select>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm text-red-600 border border-red-200 hover:bg-red-50 transition-colors font-medium"
        >
          <X size={14} aria-hidden="true" />
          {strings.products.resetFilters}
        </button>
      )}
    </div>
  );
}
