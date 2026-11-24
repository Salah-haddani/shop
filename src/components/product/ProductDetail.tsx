"use client";

import { useState, lazy, Suspense } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { strings } from "@/lib/strings";
import { discountPercent } from "@/lib/format";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { Product } from "@/types";

const OrderModal = lazy(() => import("@/components/order/OrderModal"));

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const discount = product.oldPrice
    ? discountPercent(product.price, product.oldPrice)
    : null;

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => q + 1);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div className="flex flex-col gap-3">
          {/* Main image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-opacity duration-300"
              priority
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Badge variant="danger" className="text-sm px-4 py-2">
                  {strings.product.outOfStock}
                </Badge>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-primary"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  aria-label={`Image ${idx + 1}`}
                  aria-pressed={selectedImage === idx}
                >
                  <Image
                    src={img}
                    alt={`${product.name} – vue ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm text-primary font-medium capitalize mb-1">
              {product.category}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-extrabold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <>
                <span className="text-gray-400 text-lg line-through">
                  {formatPrice(product.oldPrice)}
                </span>
                {discount && (
                  <Badge variant="accent" className="text-sm px-2.5 py-1">
                    -{discount}%
                  </Badge>
                )}
              </>
            )}
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2.5 h-2.5 rounded-full ${product.inStock ? "bg-primary" : "bg-red-500"}`}
              aria-hidden="true"
            />
            <span
              className={`text-sm font-medium ${product.inStock ? "text-primary" : "text-red-600"}`}
            >
              {product.inStock
                ? strings.product.inStock
                : strings.product.outOfStock}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-sm">
            {product.description}
          </p>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Quantity + Order */}
          <div className="flex items-center gap-4 pt-2">
            {/* Quantity selector */}
            <div
              className="flex items-center border border-gray-200 rounded-xl overflow-hidden"
              aria-label={strings.product.quantity}
            >
              <button
                onClick={decrement}
                disabled={quantity <= 1}
                className="px-3 py-2.5 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-40"
                aria-label="Diminuer la quantité"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-2.5 font-semibold text-gray-900 min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={increment}
                className="px-3 py-2.5 text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Augmenter la quantité"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Order button */}
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              disabled={!product.inStock}
              onClick={() => setModalOpen(true)}
              title={
                !product.inStock
                  ? strings.order.outOfStockTooltip
                  : undefined
              }
            >
              <ShoppingBag size={18} aria-hidden="true" />
              {strings.product.addToCart}
            </Button>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {modalOpen && (
        <Suspense fallback={null}>
          <OrderModal
            product={product}
            quantity={quantity}
            onClose={() => setModalOpen(false)}
          />
        </Suspense>
      )}
    </>
  );
}
