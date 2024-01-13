import { products as initialProducts } from './mocks/products.json'
import { Products } from './components/Products.jsx'
import { Filters } from './components/Filters.jsx'
import { FilterContext } from './context/FilterContext.jsx'
import { useContext } from 'react'

function App () {
  const { filters, setFilters } = useContext(FilterContext)

  const productsFiltered = initialProducts.filter(
    p => {
      return (
        p.price >= filters.minPrice && (p.category === filters.category || filters.category === 'none')
      )
    }
  )

  return (
    <>
      <header>
        <h1>Mi tienda en React</h1>
      </header>
      <main>
        <Filters />
        <Products products={productsFiltered} />
      </main>
    </>
  )
}

export default App
