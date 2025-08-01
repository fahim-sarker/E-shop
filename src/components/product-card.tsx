import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="flex flex-col h-full group cursor-pointer">
      <CardHeader className="flex-grow">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="w-full h-48 object-contain mb-4 rounded-md group-hover:scale-110 transition-transform duration-300 ease-in-out"
          priority={false}
        />
        <CardTitle className="text-lg font-semibold line-clamp-2">{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/product/${product.id}`} className="w-full">
          <Button className="w-full cursor-pointer py-5 hover:bg-transparent hover:text-black duration-300 ease-in-out border border-gray-900">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
