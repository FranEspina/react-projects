import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { EuroFormat } from '../services/eurosService'

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