"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OrdersPage() {
  const orders = useSelector((state: RootState) => state.orders.list)

  return (
    <section className="py-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900">Your Orders</h1>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View all your past orders.</CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-center text-gray-500 py-10">You havent placed any orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Total Items</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead className="text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
                      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{format(new Date(order.orderDate), "PPP")}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/orders/${order.id}`}>
                          <Button variant="outline" size="sm" className="cursor-pointer">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
