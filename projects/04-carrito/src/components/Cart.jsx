import { useContext } from 'react'
import './Cart.css'
import { CartContext } from '../context/CartContext'

export function Cart () {
  const { cartItems, amountCart } = useContext(CartContext)
  return (
    <aside className='cart'>
      <header>
        <p>Carrito</p>
        <p>{amountCart} <span> €</span></p>
      </header>
      <div>
        {(cartItems.length > 0)
        ?
        <ul>
          {cartItems.map(p => {
            return (
              <li key={p.id}>{p.title} ({p.cantidad})</li>
            )
          })}
        </ul>
        :
        <p>No hay productos</p>
        }
      </div>
    </aside>
  )
}
