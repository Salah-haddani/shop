"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import ProductGrid from "@/components/product/ProductGrid";
import { strings } from "@/lib/strings";
import { searchProducts } from "@/lib/products";
import type { Product } from "@/types";

interface ProductListClientProps {
  products: Product[];
  maxPrice: number;
}

export default function ProductListClient({
  products,
  maxPrice,
}: ProductListClientProps) {
  const searchParams = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const availability = searchParams.get("availability") ?? "";
  const priceMax = Number(searchParams.get("priceMax") ?? maxPrice);
  const sort = searchParams.get("sort") ?? "default";

  const filtered = useMemo(() => {
    let result = searchProducts(q, products);

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    if (availability === "instock") {
      result = result.filter((p) => p.inStock);
    } else if (availability === "outofstock") {
      result = result.filter((p) => !p.inStock);
    }

    result = result.filter((p) => p.price <= priceMax);

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name, "fr"));
        break;
    }

    return result;
  }, [products, q, category, availability, priceMax, sort]);

  return (
    <div>
      <p className="text-sm text-gray-500 mb-6 font-medium">
        {strings.products.resultCount(filtered.length)}
      </p>
      <ProductGrid
        products={filtered}
        emptyMessage={strings.products.emptyMessage}
      />
    </div>
  );
}
