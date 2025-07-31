"use client"

import Link from "next/link"
import { ShoppingCart, ListOrdered } from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"

export default function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className="bg-gray-800 py-10 xl:px-0 px-3 text-white sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          E-Shop
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/checkout" className="relative flex items-center">
            <ShoppingCart className="h-6 w-6" />
            {totalItemsInCart > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItemsInCart}
              </span>
            )}
            <span className="ml-2 hidden sm:inline">Cart</span>
          </Link>
          <Link href="/orders" className="flex items-center">
            <ListOrdered className="h-6 w-6" />
            <span className="ml-2 hidden sm:inline">Orders</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
