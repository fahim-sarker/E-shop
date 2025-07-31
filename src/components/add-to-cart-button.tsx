"use client"

import { useDispatch } from "react-redux"
import { addToCart } from "@/lib/redux/slices/cartSlice"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast" // Changed from sonner

export default function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    toast.success(`Product added to your cart.`) // Using toast.success for a positive message
  }

  return (
    <Button onClick={handleAddToCart} className="w-full py-8 text-lg cursor-pointer
     hover:bg-transparent hover:text-black duration-300 ease-in-out border border-gray-900">
      Add to Cart
    </Button>
  )
}
