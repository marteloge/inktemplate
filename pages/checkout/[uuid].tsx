import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const toCheckout = async (uuid) => {
  const { session_id } = await fetch("/api/checkout/session", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      uuid,
    }),
  }).then((res) => res.json());

  const stripe = await stripePromise;
  const { error } = await stripe.redirectToCheckout({
    sessionId: session_id,
  });
};

const Checkout = ({ uuid }) => {
  return (
    <div>
      <button role="link" onClick={() => toCheckout(uuid)}>
        Checkout
      </button>
    </div>
  );
};

Checkout.getInitialProps = ({ query }) => ({ uuid: query.uuid });

export default Checkout;
