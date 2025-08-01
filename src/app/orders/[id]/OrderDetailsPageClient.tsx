"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/lib/redux/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import Image from "next/image";

interface Props {
  id: string;
}

export default function OrderDetailsPageClient({ id }: Props) {
  const orders = useSelector((state: RootState) => state.orders.list);
  const order = orders.find(o => o.id === id);

  if (!order) {
    notFound();
  }

  return (
    <section className="py-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900">
        Order Details
      </h1>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Order ID: {order.id}</CardTitle>
          <CardDescription>
            Placed on {format(new Date(order.orderDate), "PPPpp")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
            <p>
              <strong>Name:</strong> {order.customerName}
            </p>
            <p>
              <strong>Address:</strong> {order.shippingAddress}
            </p>
            <p>
              <strong>Phone:</strong> {order.phoneNumber}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Items Ordered</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={60}
                        height={60}
                        className="object-contain rounded-md"
                      />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      ${item.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end items-center border-t pt-4">
            <h2 className="text-2xl font-bold mr-4">Order Total:</h2>
            <span className="text-3xl font-extrabold text-gray-900">
              ${order.totalAmount.toFixed(2)}
            </span>
          </div>

          <div className="text-center pt-4">
            <Button
              asChild
              className="w-full cursor-pointer hover:bg-transparent hover:text-black duration-300 ease-in-out border border-gray-900 py-5"
            >
              <Link href="/orders">Back to Orders</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
