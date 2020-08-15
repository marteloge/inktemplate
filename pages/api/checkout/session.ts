import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price: process.env.PRICE_ID_PLACE_CARD_US, quantity: 1 }],
    mode: "payment",
    metadata: { uuid: req.body.uuid },
    success_url: `${req.headers.origin}/receipt?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/checkout`,
  });
  res.status(200).json({ session_id: session.id });
};
