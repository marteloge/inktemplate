import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const langSlug = req.body.language === "en" ? "" : `${req.body.language}/`;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price: req.body.price_id, quantity: 1 }],
    mode: "payment",
    metadata: { uuid: req.body.uuid },
    success_url: `${req.headers.origin}/${langSlug}preview/${req.body.uuid}?paid=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/${langSlug}preview/${req.body.uuid}`,
  });

  res.status(200).json({ session_id: session.id });
};
