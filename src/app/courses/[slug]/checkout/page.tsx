import { CheckoutForm } from "./checkout-form";

export const dynamic = "force-dynamic";

export default function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  return <CheckoutForm params={params} />;
}
