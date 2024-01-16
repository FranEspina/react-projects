import { useContext, useId } from 'react'
import { CartContext } from '../context/CartContext'
import { EuroFormat } from '../services/eurosService'
import { CartIcon } from '../components/Icons.jsx'
import { CartItem } from './CartItem.jsx'

export function Cart () {
  const { cartItems, amountCart, clearCart, finishCart, countItemCart } = useContext(CartContext)
  const cartCheckboxId = useId()

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
        <p className={(cartItems.length > 0) ? 'cart-num-items' : 'cart-no-items'}>
          {(cartItems.length > 0)
            ? countItemCart()
            : ''
          }
        </p>
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />
      <aside className='cart'>
        <header>
          <h3>Carrito</h3>
          <p>Total {EuroFormat(amountCart)}</p>
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
