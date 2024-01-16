import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { EuroFormat } from '../services/eurosService'

export function Products ({ products }) {
  const { addItemToCart, removeCompleteItemFromCart, isInCart } = useContext(CartContext)

  return (
    <section className='product-container'>

      {(products?.length > 0)
        ? <ul className='product-list'>
          {products.map(product => {
            return (
              <div className='product-item' key={product.id} aria-label={`Producto ${product.title}`}>
                <figure aria-label={`Imagen del producto ${product.title}`}>
                  <img src={product.thumbnail} alt={`Imagen del producto ${product.title}`} />
                </figure>
                <div className='product-actions'>
                  <button onClick={() => addItemToCart(product)}><i className='bx bx-cart-add' /></button>
                  <button
                    className={isInCart(product.id) ? 'in-cart' : 'not-in-cart'}
                    onClick={() => removeCompleteItemFromCart(product.id)}
                  >
                    Eliminar
                  </button>
                </div>
                <div className='product-info'>
                  <h4 className='product-title'>{product.title}</h4>
                  <p>{product.category}</p>
                  <p>{EuroFormat(product.price)}</p>
                </div>

              </div>
            )
          })}
        </ul>
        : <p className='warning-no-product'>No existen productos para el filtro establecido</p>
      }
    </section>
  )
}
