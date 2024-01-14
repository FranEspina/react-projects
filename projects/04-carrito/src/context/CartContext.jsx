import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext()

export function CartProvider ({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [amountCart, setAmountCart] = useState(0)

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

  const removeItemFromCart = (id) => {
    const index = cartItems.findIndex(i => i.id === id)
    if (index >= 0) {
      const item = cartItems[index]
      if (item.cantidad === 1) {
        const newItems = cartItems.filter(item => item.id !== id)
        setCartItems(newItems)
        return
      }

      const newItems = structuredClone(cartItems)
      newItems[index].cantidad--
      setCartItems(newItems)
    }
  }

  useEffect(() => {
    let amount = 0
    cartItems.forEach(a => amount += a.price * a.cantidad)
    setAmountCart(amount)
  }, [cartItems])

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      addItemToCart,
      removeItemFromCart,
      amountCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
