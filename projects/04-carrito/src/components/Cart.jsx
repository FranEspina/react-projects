import { useContext } from 'react'
import './Cart.css'
import { CartContext } from '../context/CartContext'

export function Cart () {
  const { cartItems } = useContext(CartContext)
  return (
    <aside className='cart'>
      <p>Carrito</p>
      <ul>
        {cartItems.map(p => {
          return (
            <li key={p.id}>{p.title} - {p.cantidad}</li>
          )
        })}
      </ul>
    </aside>
  )
}
