import Link from "next/link";
import Image from "next/image";
import { formatPrice, discountPercent } from "@/lib/format";
import { strings } from "@/lib/strings";
import Badge from "@/components/ui/Badge";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { slug, name, price, oldPrice, images, inStock, category } = product;
  const discount = oldPrice ? discountPercent(price, oldPrice) : null;

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
      <Link
        href={`/produits/${slug}/`}
        className="block relative aspect-square overflow-hidden bg-gray-100"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={images[0]}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {!inStock && (
            <Badge variant="danger">{strings.product.outOfStock}</Badge>
          )}
          {discount && discount > 0 && (
            <Badge variant="accent">-{discount}%</Badge>
          )}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-500 mb-1 capitalize">{category}</p>
        <Link href={`/produits/${slug}/`} className="group/title flex-1">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 group-hover/title:text-primary transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-auto">
          <span className="text-primary font-bold text-base">
            {formatPrice(price)}
          </span>
          {oldPrice && (
            <span className="text-gray-400 text-sm line-through">
              {formatPrice(oldPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
