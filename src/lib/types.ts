export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  customerName: string
  shippingAddress: string
  phoneNumber: string
  items: CartItem[]
  totalAmount: number
  orderDate: string
}

export interface RootState {
  cart: {
    items: CartItem[]
  }
  orders: {
    list: Order[]
  }
}
