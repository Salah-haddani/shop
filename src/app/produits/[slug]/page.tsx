import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import {
  allProducts,
  getProductBySlug,
  getRelatedProducts,
  getCategoryBySlug,
} from "@/lib/products";
import { strings } from "@/lib/strings";
import { siteConfig } from "@/config/site";
import ProductDetail from "@/components/product/ProductDetail";
import ProductGrid from "@/components/product/ProductGrid";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const category = getCategoryBySlug(product.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "MAD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="mb-8">
        <ol className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              {strings.product.breadcrumbHome}
            </Link>
          </li>
          <ChevronRight size={14} className="text-gray-400" aria-hidden="true" />
          <li>
            <Link href="/produits/" className="hover:text-primary transition-colors">
              {strings.product.breadcrumbProducts}
            </Link>
          </li>
          {category && (
            <>
              <ChevronRight size={14} className="text-gray-400" aria-hidden="true" />
              <li>
                <Link
                  href={`/categories/${category.slug}/`}
                  className="hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            </>
          )}
          <ChevronRight size={14} className="text-gray-400" aria-hidden="true" />
          <li className="text-gray-900 font-medium" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Product detail */}
      <ProductDetail product={product} />

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {strings.product.relatedTitle}
          </h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
