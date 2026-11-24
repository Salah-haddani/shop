import Link from "next/link";
import { Home, ShoppingBag } from "lucide-react";
import { strings } from "@/lib/strings";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="text-8xl font-extrabold text-primary/20 mb-6 select-none">
          404
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          {strings.notFound.title}
        </h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          {strings.notFound.message}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors"
          >
            <Home size={18} aria-hidden="true" />
            {strings.notFound.backHome}
          </Link>
          <Link
            href="/produits/"
            className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-semibold px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition-colors"
          >
            <ShoppingBag size={18} aria-hidden="true" />
            {strings.notFound.shopProducts}
          </Link>
        </div>
      </div>
    </div>
  );
}
