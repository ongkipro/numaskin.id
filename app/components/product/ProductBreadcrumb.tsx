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
    <nav aria-label="Breadcrumb" className={`w-full max-w-full overflow-hidden select-none relative z-10 ${className}`}>
      <ol className="flex items-center gap-1.5 sm:gap-2 flex-nowrap whitespace-nowrap min-w-0 w-full overflow-hidden font-mono text-[9px] sm:text-[10.5px] uppercase tracking-[0.13em] sm:tracking-[0.16em] text-slate-500">
        <li className="shrink-0">
          <Link to="/" className="hover:text-[#002B49] transition-colors flex items-center gap-1">
            <span>Beranda</span>
          </Link>
        </li>
        <li aria-hidden="true" className="shrink-0 text-[#269BA8]/45 select-none">
          /
        </li>
        <li className="shrink-0 max-w-[100px] sm:max-w-none truncate">
          <Link to={`/collections/${collectionSlug}`} className="hover:text-[#002B49] transition-colors truncate block">
            {collectionLabel}
          </Link>
        </li>
        {showCurrentTitle && (
          <>
            <li aria-hidden="true" className="shrink-0 text-[#269BA8]/45 select-none">
              /
            </li>
            <li
              className="min-w-0 flex-1 truncate font-semibold text-[#002B49]"
              aria-current="page"
              title={product.title}
            >
              {product.title}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
