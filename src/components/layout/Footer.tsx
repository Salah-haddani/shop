import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { allCategories } from "@/lib/products";
import { strings } from "@/lib/strings";

// Inline social SVGs (lucide-react v1 removed brand icons)
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
      <path d="M4 4l16 16M4 20L20 4" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"/>
      <path d="M2 3h6.5L22 21h-6.5L2 3z"/>
    </svg>
  );
}

const quickLinks = [
  { href: "/", label: strings.nav.home },
  { href: "/produits/", label: strings.nav.products },
  { href: "/a-propos/", label: strings.nav.about },
  { href: "/contact/", label: strings.nav.contact },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label={siteConfig.name}>
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={200}
                height={60}
                className="h-[60px] w-[200px] object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-5">
              {strings.footer.description}
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {siteConfig.socials.facebook && (
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2 rounded-lg bg-gray-800 hover:bg-primary transition-colors"
                >
                  <FacebookIcon />
                </a>
              )}
              {siteConfig.socials.instagram && (
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 rounded-lg bg-gray-800 hover:bg-primary transition-colors"
                >
                  <InstagramIcon />
                </a>
              )}
              {siteConfig.socials.twitter && (
                <a
                  href={siteConfig.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="p-2 rounded-lg bg-gray-800 hover:bg-primary transition-colors"
                >
                  <TwitterIcon />
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              {strings.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              {strings.footer.categories}
            </h3>
            <ul className="space-y-2.5">
              {allCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}/`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              {strings.footer.contact}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <MapPin size={15} className="shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Phone size={15} className="shrink-0 text-primary" aria-hidden="true" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Mail size={15} className="shrink-0 text-primary" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <Clock size={15} className="shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                <span>{siteConfig.openingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          {strings.footer.copyright(year, siteConfig.name)}
        </div>
      </div>
    </footer>
  );
}
