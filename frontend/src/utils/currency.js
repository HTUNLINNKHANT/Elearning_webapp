/**
 * Format price in Myanmar Kyat (MMK)
 * @param {number} price - The price to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  if (!price && price !== 0) return "N/A";

  // Format with thousand separators
  const formatted = new Intl.NumberFormat("en-US").format(price);

  return `${formatted} Ks`;
};

/**
 * Format price with currency symbol for Myanmar Kyat
 * @param {number} price - The price to format
 * @returns {string} Formatted price with symbol
 */
export const formatPriceWithSymbol = (price) => {
  if (!price && price !== 0) return "N/A";

  const formatted = new Intl.NumberFormat("en-US").format(price);

  return `${formatted} Ks`;
};
