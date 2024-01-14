import { createContext, useState } from 'react'

export const CartContext = createContext()

export function CartProvider ({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addItemToCart = (product) => {
    const newItems = structuredClone(cartItems)
    let item = newItems.find(i => i.id === product.id)
    if (item) {
      item.cantidad++
    } else {
      item = {
        ...product,
        cantidad: 1
      }
      newItems.push(item)
    }
    setCartItems(newItems)
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      addItemToCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
