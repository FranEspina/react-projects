import { products } from '../mocks/products.json'

export function GetCategories () {
  return [...new Set(products.map(p => p.category))]
}
