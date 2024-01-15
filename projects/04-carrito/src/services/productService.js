import { products as mockProducts } from '../mocks/products.json'

export async function getProductsAsync () {
  const res = await fetch('https://dummyjson.com/products')
  if (res.ok) {
    const json = await res.json()
    if (json) {
      return json.products
    }
  } else {
    return mockProducts
  }
}
