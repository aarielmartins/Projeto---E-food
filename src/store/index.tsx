import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './redurcers/cart'

export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
})

export type RootReducer = ReturnType<typeof store.getState>
