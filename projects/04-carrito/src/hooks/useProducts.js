import { useContext, useState } from 'react'
import { getProductsAsync } from '../services/productService.js'
import { FilterContext } from '../context/FilterContext.jsx'
import { PAGINATION } from '../constant.js'

export function useProduct () {
  const [productsFiltered, setProductsFiltered] = useState([])
  const { filters } = useContext(FilterContext)

  getProductsAsync().then(products => {
    const filtered = products.filter(
      p => {
        return (
          p.price >= filters.minPrice && (p.category === filters.category || filters.category === 'none')
        )
      }
    ).slice(0, PAGINATION.SIZE) // de momento no paginamos
    setProductsFiltered(filtered)
  })

  return { products: productsFiltered }
}
