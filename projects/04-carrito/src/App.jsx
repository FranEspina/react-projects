import { products as initialProducts } from './mocks/products.json'
import { Products } from './components/Products.jsx'
import { Filters } from './components/Filters.jsx'

function App () {
  return (
    <>
      <header>
        <h1>Mi tienda en React</h1>
      </header>
      <main>
        <Filters />
        <Products products={initialProducts} />
      </main>
    </>
  )
}

export default App
