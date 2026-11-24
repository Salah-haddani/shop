import { siteConfig } from "@/config/site";

/**
 * Builds a wa.me URL with a pre-filled message.
 */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Returns the base wa.me URL without a message (for the floating button).
 */
export function getWhatsAppBaseUrl(): string {
  return `https://wa.me/${siteConfig.whatsapp}`;
}
