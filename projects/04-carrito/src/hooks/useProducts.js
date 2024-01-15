import { useContext, useEffect, useState } from 'react'
import { getProductsAsync } from '../services/productService.js'
import { FilterContext } from '../context/FilterContext.jsx'
import { PAGINATION } from '../constant.js'
import { GetCategories } from '../services/categoryServices.js'

export function useProduct () {
  const [initialProducts, setInitialProducts] = useState([])
  const { filters } = useContext(FilterContext)
  const { setCategories } = useContext(FilterContext)

  useEffect(() => {
    getProductsAsync().then(
      products => setInitialProducts(products)
    )
  }, [])

  useEffect(() => {
    setCategories(GetCategories(initialProducts))
  }, [initialProducts])

  const productsFiltered = initialProducts.filter(
    p => {
      return (
        p.price >= filters.minPrice && (p.category === filters.category || filters.category === 'none')
      )
    }
  ).slice(0, PAGINATION.SIZE) // de momento no paginamos

  return { products: productsFiltered }
}
