/**
 * Numa Skin Storefront Utility Functions
 */

/**
 * Format IDR currency cleanly without trailing decimal zeros (,00)
 * Example: 79000 -> "Rp 79.000"
 */
export function formatRupiah(amount: number | string | null | undefined): string {
  if (amount == null) return 'Rp 0';
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return 'Rp 0';
  return 'Rp ' + Math.round(num).toLocaleString('id-ID');
}

/**
 * Calculate percentage discount between current price and compare-at price
 */
export function calculateDiscount(currentPrice: number, compareAtPrice: number): number {
  if (!compareAtPrice || compareAtPrice <= currentPrice) return 0;
  return Math.round(((compareAtPrice - currentPrice) / compareAtPrice) * 100);
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Clean variant title (suppress synthetic "Default Title")
 */
export function cleanVariantTitle(title?: string | null): string | null {
  if (!title || title === 'Default Title' || title === 'Default') return null;
  return title;
}
