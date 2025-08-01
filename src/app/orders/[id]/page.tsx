import OrderDetailsPageClient from "./OrderDetailsPageClient";

type Params = Promise<{ id: string }>;
// Correct param type
export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  return {
    title: `Order #${id}`,
  };
}

// Pass plain string id
export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  return <OrderDetailsPageClient id={id} />;
}
