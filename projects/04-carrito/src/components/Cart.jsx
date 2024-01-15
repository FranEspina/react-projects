import { useContext, useId } from 'react'
import './Cart.css'
import { CartContext } from '../context/CartContext'
import { EuroFormat } from '../services/eurosService'
import { CartIcon } from '../components/Icons.jsx'

export function CartItem ({ producto }) {
  const { addItemToCart, removeItemFromCart } = useContext(CartContext)

  return (
    <li className='cart-item'>
      <img
        src={producto.thumbnail}
        alt={producto.title}
      />
      <p>{producto.title}</p>
      <div className='detail-item'>
        <p>{producto.cantidad} x {EuroFormat(producto.price)}</p>
        <div className='cart-item-actions'>
          <button onClick={() => removeItemFromCart(producto.id)}>-</button>
          <button onClick={() => addItemToCart(producto)}>+</button>
        </div>
      </div>
    </li>
  )
}

export function Cart () {
  const { cartItems, amountCart, clearCart, finishCart } = useContext(CartContext)
  const cartCheckboxId = useId()

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />
      <aside className='cart'>
        <header>
          <p>Carrito</p>
          <p>{EuroFormat(amountCart)}</p>
        </header>
        <div className='cart-container'>
          {
          (cartItems.length > 0)
            ? <ul className='cart-list'>
              {cartItems.map(p => {
                return (<CartItem key={p.id} producto={p} />)
              })}
            </ul>
            : <p>No hay productos</p>
          }
        </div>
        <footer>
          <button onClick={clearCart}>Vaciar Carrito</button>
          <button className='danger' onClick={finishCart}>Tramitar</button>
        </footer>
      </aside>
    </>
  )
}
