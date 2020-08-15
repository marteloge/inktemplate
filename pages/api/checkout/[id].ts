import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session_id = req.query.id as string;
  const order = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["customer"],
  });

  res.status(200).json(order);
};
