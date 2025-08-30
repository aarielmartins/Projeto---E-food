import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CardapioIten } from '../../models/cardapio'

type CartState = {
  itens: CardapioIten[]
  isOpen: boolean
  isPayment: boolean
  isOrder: boolean
}

const initialState: CartState = {
  itens: [],
  isOpen: false,
  isPayment: false,
  isOrder: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CardapioIten>) => {
      const geraId = state.itens.find((item) => item.id === action.payload.id)

      if (!geraId) {
        state.itens.push(action.payload)
      } else {
        alert('O jogo já esta no carrinho')
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((item) => item.id !== action.payload)
    },
    clear: () => {
      return initialState
    },
    open: (state) => {
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false
    },
    openOrder: (state) => {
      state.isOrder = true
    },
    closeOrder: (state) => {
      state.isOrder = false
    },
    openPayment: (state) => {
      state.isPayment = true
    },
    closePayment: (state) => {
      state.isPayment = false
    }
  }
})

export const {
  add,
  open,
  close,
  remove,
  openPayment,
  closePayment,
  openOrder,
  closeOrder,
  clear
} = cartSlice.actions
export default cartSlice.reducer
