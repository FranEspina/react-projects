import { createContext, useEffect, useReducer, useState } from 'react'
import { cartReducer, cartInitialState, CART_ACTION_TYPES } from '../reducers/cartReducer'

export const CartContext = createContext()

export function CartProvider ({ children }) {
  const [amountCart, setAmountCart] = useState(0)

  function useCartReducer () {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    const finishCart = () => dispatch({ type: CART_ACTION_TYPES.FINISH_CART })

    const clearCart = () => dispatch({ type: CART_ACTION_TYPES.FINISH_CART })

    const removeItemFromCart = (id) => dispatch({
      type: CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART,
      payload: id
    })

    const removeCompleteItemFromCart = (id) => dispatch({
      type: CART_ACTION_TYPES.REMOVE_COMPLETE_ITEM_FROM_CART,
      payload: id
    })

    const addItemToCart = (product) => dispatch({
      type: CART_ACTION_TYPES.ADD_ITEM_TO_CART,
      payload: product
    })

    return { state, finishCart, clearCart, removeItemFromCart, addItemToCart, removeCompleteItemFromCart }
  }

  const { state, finishCart, clearCart, removeItemFromCart, addItemToCart, removeCompleteItemFromCart } = useCartReducer()

  useEffect(() => {
    let amount = 0
    state.forEach(a => {
      amount += a.price * a.cantidad
    })
    setAmountCart(amount)
  }, [state])

  const isInCart = (id) => {
    return state.findIndex(item => item.id === id) >= 0
  }

  const countItemCart = () => {
    let count = 0
    state.forEach(item => {
      count += item.cantidad
    })
    return count
  }

  return (
    <CartContext.Provider value={{
      cartItems: state,
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
