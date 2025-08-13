import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CardapioIten } from '../../models/cardapio'

type CartState = {
  itens: CardapioIten[]
  isOpen: boolean
}

const initialState: CartState = {
  itens: [],
  isOpen: false
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
    open: (state) => {
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false
    }
  }
})

export const { add, open, close, remove } = cartSlice.actions
export default cartSlice.reducer
