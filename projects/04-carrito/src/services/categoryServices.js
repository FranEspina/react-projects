export function GetCategories (products) {
  return [...new Set(products.map(p => p.category))]
}
