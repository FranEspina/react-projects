import { useContext, useEffect, useState, useCallback } from 'react'
import { getProductsAsync } from '../services/productService.js'
import { FilterContext } from '../context/FilterContext.jsx'
import { PAGINATION } from '../constant.js'
import { GetCategories } from '../services/categoryServices.js'
import debounce from 'just-debounce-it'

export function useProduct () {
  const [initialProducts, setInitialProducts] = useState([])
  const { filters } = useContext(FilterContext)
  const { setCategories } = useContext(FilterContext)
  const [products, setProducts] = useState()

  useEffect(() => {
    getProductsAsync().then(
      products => setInitialProducts(products)
    )
  }, [])

  useEffect(() => {
    setCategories(GetCategories(initialProducts))
    setProducts(initialProducts)
  }, [initialProducts])

  const debounceFilterProduct = useCallback(debounce((products, delayFilters) => {
    if (products.length === 0) return []
    const productsFiltered = products.filter(
      p => {
        return (
          p.price >= delayFilters.minPrice && (p.category === delayFilters.category || delayFilters.category === 'none')
        )
      }
    ).slice(0, PAGINATION.SIZE)
    console.log({ momento: 'filtrando', filtros: delayFilters, proFilt: productsFiltered })
    setProducts(productsFiltered)
  }, 300), [])

  useEffect(() => {
    debounceFilterProduct(initialProducts, filters)
  }, [filters])

  return { products }
}