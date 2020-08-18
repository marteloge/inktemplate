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
    draft.paid = true;

    sendgrid.setApiKey(process.env.EMAIL_SENDGRID_API_KEY);

    const msg = {
      to: (order.customer as Stripe.Customer).email,
      from: process.env.EMAIL,
      subject: "payment.success.subject",
      text: "InkTemplate - Print is ready!",
      // html: t("payment.success.html", {
      //   uuid: draft.uuid,
      //   edit: `http://${req.headers.host}/${draft.language}/change/${draft.uuid}`,
      //   download: `http://${req.headers.host}/${draft.language}/download/${draft.uuid}`,
      // }),
      html: `Hello, \n\n Here is your print! http://localhost:3000/${draft.language}/${draft.uuid}`,
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

//TODO: Translate all email
