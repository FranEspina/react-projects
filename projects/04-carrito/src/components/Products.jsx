import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export function Products({ products }) {
  const { addItemToCart, removeItemFromCart } = useContext(CartContext)

  return (
    <section className='product-container'>

      {(products?.length > 0)
        ?
        <ul className='product-list'>
          {products.map(product => {
            return (
              <div className='product-item' key={product.id} aria-label={`Producto ${product.title}`}>
                <figure aria-label={`Imagen del producto ${product.title}`}>
                  <img src={product.thumbnail} alt={`Imagen del producto ${product.title}`} />
                </figure>
                <div className='product-info'>
                  <h3>{product.title}</h3>
                  <p>{product.price} <span> €</span></p>
                </div>
                <div className='product-actions'>
                  <button onClick={() => addItemToCart(product)}><i className='bx bx-cart-add'></i></button>
                  <button onClick={() => removeItemFromCart(product.id)}>Eliminar</button>
                </div>
              </div>
            )
          })}
        </ul>
        :
        <p className='warning-no-product'>No existen productos para el filtro establecido</p>
      }
    </section>
  )
}
