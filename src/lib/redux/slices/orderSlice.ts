import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Order } from "@/lib/types"

interface OrderState {
  list: Order[]
}

const initialState: OrderState = {
  list: [],
}

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.list.push(action.payload)
    },
  },
})

export const { addOrder } = orderSlice.actions
export default orderSlice.reducer
