import { Products } from './components/Products.jsx'
import { Filters } from './components/Filters.jsx'
import { useProduct } from './hooks/useProducts.js'
import { Cart } from './components/Cart.jsx'
import { CartProvider } from './context/CartContext.jsx'

function App () {
  const { products } = useProduct()

  return (
    <>
      <header>
        <h1>Mi tienda en React</h1>
      </header>
      <main>
        <Filters />
        <CartProvider>
          <Cart />
          <Products products={products} />
        </CartProvider>
      </main>
    </>
  )
}

export default App
