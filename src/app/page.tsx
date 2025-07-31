import type { Metadata } from "next"
import ProductList from "@/components/product-list"
import type { Product } from "@/lib/types"

export const metadata: Metadata = {
  title: "Home",
  description: "Discover a wide range of products at our e-commerce store. Shop now for the best deals!",
  openGraph: {
    title: "Home | E-commerce Product Showcase",
    description: "Discover a wide range of products at our e-commerce store. Shop now for the best deals!",
  },
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", { next: { revalidate: 3600 } }) // Revalidate every hour
  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }
  return res.json()
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <section className="py-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900">Our Products</h1>
      <ProductList products={products} />
    </section>
  )
}
