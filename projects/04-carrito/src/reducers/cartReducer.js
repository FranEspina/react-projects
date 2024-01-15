export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

export const CART_ACTION_TYPES = {
  FINISH_CART: 'FINISH_CART',
  CLEAR_CART: 'CLEAR_CART',
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
  REMOVE_COMPLETE_ITEM_FROM_CART: 'REMOVE_COMPLETE_ITEM_FROM_CART'
}

const UPDATE_STATE_BY_ACTION = {
  [CART_ACTION_TYPES.FINISH_CART]: () => {
    updateLocalStorage([])
    return []
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    updateLocalStorage([])
    return []
  },
  [CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART]: (state, action) => {
    const id = action.payload
    const index = state.findIndex(i => i.id === id)
    if (index >= 0) {
      const item = state[index]
      if (item.cantidad === 1) {
        const newState = state.filter(item => item.id !== id)
        updateLocalStorage(newState)
        return newState
      }

      const newState = structuredClone(state)
      newState[index].cantidad--
      updateLocalStorage(newState)
      return newState
    }
  },
  [CART_ACTION_TYPES.ADD_ITEM_TO_CART]: (state, action) => {
    const product = action.payload
    const newState = structuredClone(state)
    let item = newState.find(i => i.id === product.id)
    if (item) {
      item.cantidad++
    } else {
      item = {
        ...product,
        cantidad: 1
      }
      newState.push(item)
    }

    updateLocalStorage(newState)
    return newState
  },
  [CART_ACTION_TYPES.REMOVE_COMPLETE_ITEM_FROM_CART]: (state, action) => {
    const id = action.payload
    const index = state.findIndex(i => i.id === id)
    if (index >= 0) {
      const newState = state.filter(item => item.id !== id)
      updateLocalStorage(newState)
      return newState
    }
  }
}

export const cartReducer = (state, action) => {
  const { type: actionType } = action
  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  return updateState ? updateState(state, action) : state
}
