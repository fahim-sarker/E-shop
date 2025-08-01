import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./slices/cartSlice"
import orderReducer from "./slices/orderSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: orderReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
