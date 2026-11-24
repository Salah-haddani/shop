/**
 * Formats a price as "45 DH"
 */
export function formatPrice(price: number): string {
  return `${price} DH`;
}

/**
 * Calculates the discount percentage between old and new price.
 */
export function discountPercent(price: number, oldPrice: number): number {
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}
