import { useContext } from 'react'
import { products as initialProducts } from '../mocks/products.json'
import { FilterContext } from '../context/FilterContext.jsx'

export function useProduct () {
  const { filters } = useContext(FilterContext)

  const productsFiltered = initialProducts.filter(
    p => {
      return (
        p.price >= filters.minPrice && (p.category === filters.category || filters.category === 'none')
      )
    }
  ).slice(0, 10) // de momento no paginamos

  return { products: productsFiltered }
}
