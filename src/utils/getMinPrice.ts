export const getMinPrice = (variants: any[]) => {
  if (!Array.isArray(variants) || variants.length === 0) {
    throw new Error("Array is empty or invalid.");
  }

  const minPriceItem = variants.reduce((minItem, currentItem) => {
    const currentPrice = parseFloat(currentItem.price.amount);
    const minPrice = parseFloat(minItem.price.amount);

    return currentPrice < minPrice ? currentItem : minItem;
  });

  return minPriceItem.price.amount;
};
