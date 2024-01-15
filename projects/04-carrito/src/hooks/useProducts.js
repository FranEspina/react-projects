import { useContext } from 'react'
import { products as initialProducts } from '../mocks/products.json'
import { FilterContext } from '../context/FilterContext.jsx'
import { PAGINATION } from '../constant.js'

export function useProduct () {
  const { filters } = useContext(FilterContext)

  const productsFiltered = initialProducts.filter(
    p => {
      return (
        p.price >= filters.minPrice && (p.category === filters.category || filters.category === 'none')
      )
    }
  ).slice(0, PAGINATION.SIZE) // de momento no paginamos

  return { products: productsFiltered }
}
