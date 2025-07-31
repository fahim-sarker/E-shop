"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { clearCart, removeFromCart, updateQuantity } from "@/lib/redux/slices/cartSlice"
import { addOrder } from "@/lib/redux/slices/orderSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast" // Changed from sonner
import { XCircle } from "lucide-react"

export default function CheckoutPage() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [shippingAddress, setShippingAddress] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [orderPlaced, setOrderPlaced] = useState(false)

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!fullName.trim()) newErrors.fullName = "Full Name is required."
    if (!shippingAddress.trim()) newErrors.shippingAddress = "Shipping Address is required."
    if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone Number is required."
    else if (!/^\d{10,}$/.test(phoneNumber))
      newErrors.phoneNumber = "Please enter a valid phone number (at least 10 digits)."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (cartItems.length === 0) {
      toast.error("Please add items to your cart before checking out.") // Using toast.error
      return
    }

    if (validateForm()) {
      const newOrder = {
        id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        customerName: fullName,
        shippingAddress: shippingAddress,
        phoneNumber: phoneNumber,
        items: cartItems,
        totalAmount: totalAmount,
        orderDate: new Date().toISOString(),
      }
      dispatch(addOrder(newOrder))
      dispatch(clearCart())
      setOrderPlaced(true)
      toast.success(`Your order successfully placed.`) // Using toast.success
    } else {
      toast.error("Please fill in all required fields correctly.") // Using toast.error
    }
  }

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You for Your Order!</h1>
        <p className="text-lg text-gray-700 mb-8">Your order has been successfully placed.</p>
        <Button onClick={() => router.push("/orders")} className="cursor-pointer
     hover:bg-transparent hover:text-black duration-300 ease-in-out border border-gray-900 py-5">View Your Orders</Button>
        <Button variant="link" onClick={() => router.push("/")} className="mt-2 cursor-pointer
     hover:bg-transparent hover:text-black duration-300 ease-in-out border border-gray-900 py-5">
          Continue Shopping
        </Button>
      </div>
    )
  }

  return (
    <section className="py-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Cart</CardTitle>
            <CardDescription>Review your items before checkout.</CardDescription>
          </CardHeader>
          <CardContent>
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center border-b pb-4 last:border-b-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="object-contain rounded-md mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-1">
                        <Label htmlFor={`quantity-${item.id}`} className="sr-only">
                          Quantity
                        </Label>
                        <Input
                          id={`quantity-${item.id}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(updateQuantity({ id: item.id, quantity: Number.parseInt(e.target.value) }))
                          }
                          className="w-20 mr-2"
                        />
                        <Button variant="destructive" size="sm" className="bg-gray-900 cursor-pointer" onClick={() => dispatch(removeFromCart(item.id))}>
                          <XCircle className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </div>
                    </div>
                    <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between items-center border-t pt-4">
            <h2 className="text-xl font-bold">Total:</h2>
            <span className="text-2xl font-extrabold">${totalAmount.toFixed(2)}</span>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
            <CardDescription>Please provide your details for shipping.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="pb-2">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <Label htmlFor="shippingAddress" className="pb-2">Shipping Address</Label>
                <Input
                  id="shippingAddress"
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className={errors.shippingAddress ? "border-red-500" : ""}
                />
                {errors.shippingAddress && <p className="text-red-500 text-sm mt-1">{errors.shippingAddress}</p>}
              </div>
              <div>
                <Label htmlFor="phoneNumber" className="pb-2">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={errors.phoneNumber ? "border-red-500" : ""}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>
              <Button type="submit" className="w-full cursor-pointer
     hover:bg-transparent hover:text-black duration-300 ease-in-out border border-gray-900 py-5">
                Place Order
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
