import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import type { Product, Category } from "@/types";

export const allProducts: Product[] = productsData as Product[];
export const allCategories: Category[] = categoriesData as Category[];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return allCategories.find((c) => c.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return allProducts.filter((p) => p.category === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return allProducts.filter((p) => p.featured);
}

export function getNewArrivals(count = 4): Product[] {
  // Last N products by id (treating id as sequence)
  return [...allProducts].reverse().slice(0, count);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return allProducts
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, count);
}

export function searchProducts(
  query: string,
  products: Product[] = allProducts
): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.tags ?? []).some((t) => t.toLowerCase().includes(q))
  );
}
