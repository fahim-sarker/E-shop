import Image from "next/image";
import type { Product } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddToCartButton from "@/components/add-to-cart-button";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;
// Fetch a single product
async function getProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;
  return res.json();
}

// Generate static paths for all products
export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();

  return products.map(product => ({
    id: product.id.toString(),
  }));
}

// Generate metadata for SEO & social sharing
export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  const shortDescription = product.description.slice(0, 160) + "...";

  return {
    title: product.title,
    description: shortDescription,
    openGraph: {
      title: product.title,
      description: shortDescription,
      images: [
        {
          url: product.image,
          alt: product.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: shortDescription,
      images: [product.image],
    },
  };
}

// Product Details Page Component
export default async function ProductDetailsPage({
  params,
}: {
  params: Params;
}) {
  console.log("details params", params);
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return notFound();

  return (
    <section className="py-8">
      <Card className="flex flex-col md:flex-row items-center md:items-start p-6 gap-8">
        <div className="md:w-1/2 flex justify-center border p-5 rounded-lg">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={400}
            height={400}
            className="object-contain max-h-[500px] rounded-lg shadow-md p-5"
            priority
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <CardHeader className="p-0">
            <CardTitle className="lg:text-4xl text-xl font-extrabold text-gray-900">
              {product.title}
            </CardTitle>
            <CardDescription className="text-gray-600 lg:text-lg text-base">
              {product.category}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <p className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
            <div className="flex items-center text-gray-600">
              <span className="font-semibold mr-2">Rating:</span>
              {product.rating.rate} ({product.rating.count} reviews)
            </div>
            <AddToCartButton product={product} />
          </CardContent>
        </div>
      </Card>
    </section>
  );
}
