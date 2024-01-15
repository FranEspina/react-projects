import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext()

export function CartProvider ({ children }) {
  const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []
  const [cartItems, setCartItems] = useState(cartInitialState)
  const [amountCart, setAmountCart] = useState(0)

  // update localStorage with state for cart
  const updateLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state))
  }

  const clearCart = () => {
    setCartItems([])
    updateLocalStorage([])
  }

  const finishCart = () => {
    setCartItems([])
    updateLocalStorage([])
  }

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

    updateLocalStorage(newItems)
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

      updateLocalStorage(newItems)
      setCartItems(newItems)
    }
  }

  const removeCompleteItemFromCart = (id) => {
    const index = cartItems.findIndex(i => i.id === id)
    if (index >= 0) {
      const newItems = cartItems.filter(item => item.id !== id)
      updateLocalStorage(newItems)
      setCartItems(newItems)
    }
  }

  const isInCart = (id) => {
    return cartItems.findIndex(item => item.id === id) >= 0
  }

  const countItemCart = () => {
    let count = 0
    cartItems.forEach(item => {
      count += item.cantidad
    })
    return count
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
      clearCart,
      finishCart,
      removeCompleteItemFromCart,
      isInCart,
      countItemCart,
      amountCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
