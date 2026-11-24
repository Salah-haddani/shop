import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import {
  allCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/products";
import { strings } from "@/lib/strings";
import ProductGrid from "@/components/product/ProductGrid";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: category.name,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const products = getProductsByCategory(slug);

  return (
    <div>
      {/* Category header */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'Ariane" className="mb-3">
            <ol className="flex items-center gap-1.5 text-sm text-white/70 flex-wrap">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {strings.category.breadcrumbHome}
                </Link>
              </li>
              <ChevronRight size={14} aria-hidden="true" />
              <li>
                <Link
                  href="/produits/"
                  className="hover:text-white transition-colors"
                >
                  {strings.category.breadcrumbCategories}
                </Link>
              </li>
              <ChevronRight size={14} aria-hidden="true" />
              <li className="text-white font-medium" aria-current="page">
                {category.name}
              </li>
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {category.name}
          </h1>
          <p className="text-white/80 mt-2 max-w-xl text-sm sm:text-base">
            {category.description}
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ProductGrid
          products={products}
          emptyMessage={strings.category.noProducts}
        />
      </div>
    </div>
  );
}
