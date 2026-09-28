import { Link } from 'react-router';
import { Home } from 'lucide-react';
import type { Product } from '~/lib/mock-catalog';

interface ProductBreadcrumbProps {
  product: Product;
  className?: string;
  showCurrentTitle?: boolean;
}

export function ProductBreadcrumb({ product, className = '', showCurrentTitle = true }: ProductBreadcrumbProps) {
  const collectionSlug = product.collections[0] || 'all';
  const collectionLabel = product.productType || 'Produk';

  return (
    <nav aria-label="Breadcrumb" className={`text-xs relative z-10 select-none ${className}`}>
      <ol className="flex items-center gap-1.5 sm:gap-2 flex-wrap font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.16em] text-slate-500">
        <li>
          <Link to="/" className="hover:text-[#002B49] transition-colors">
            Beranda
          </Link>
        </li>
        <li aria-hidden="true" className="text-[#269BA8]/50">
          /
        </li>
        <li>
          <Link to={`/collections/${collectionSlug}`} className="hover:text-[#002B49] transition-colors">
            {collectionLabel}
          </Link>
        </li>
        {showCurrentTitle && (
          <>
            <li aria-hidden="true" className="text-[#269BA8]/50">
              /
            </li>
            <li className="font-semibold text-[#002B49] truncate max-w-[200px] sm:max-w-xs" aria-current="page">
              {product.title}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
