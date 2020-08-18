import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import sendgrid from "@sendgrid/mail";

import { getDraft, createOrUpdateDraft } from "./../../../src/api";
import { Draft } from "../../../src/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session_id = req.query.id as string;

  const order = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["customer"],
  });

  const draft: Draft = await getDraft(order.metadata.uuid).then(
    (draft) => draft as Draft
  );

  if (!draft.sentReceipt) {
    draft.sentReceipt = true;

    sendgrid.setApiKey(process.env.EMAIL_SENDGRID_API_KEY);

    const msg = {
      to: (order.customer as Stripe.Customer).email,
      from: process.env.EMAIL,
      subject: "InkTemplate - Your print is ready!",
      text: "Hello, ",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    (async () => {
      try {
        await sendgrid
          .send(msg)
          .then(() => createOrUpdateDraft(order.metadata.uuid, draft));
      } catch (error) {
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
        }
      }
    })();
  }

  res.status(200).json({ order: { ...order }, draft });
};
