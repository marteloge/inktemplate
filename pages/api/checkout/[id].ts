import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import sendgrid from "@sendgrid/mail";

import { getDraft, createOrUpdateDraft } from "../../../helpers/api";
import { Draft } from "../../../helpers/types";

const emails = {
  en: {
    subject: "InkTemplate - Print is ready!",
    download: "Download",
    change: "Change",
    intro: "Hello, <br><br>Your print is ready for you :) Happy printing! <br>",
  },
  no: {
    subject: "InkTemplate - Klar for printeren!",
    download: "Last ned",
    change: "Endre",
    intro: "Hello, <br>Ditt trykk er nå klar for å printes! Lykke til! <br>",
  },
};

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
    draft.updated = new Date();

    sendgrid.setApiKey(process.env.EMAIL_SENDGRID_API_KEY);
    const trans = emails[draft.language || "en"];

    const msg = {
      to: (order.customer as Stripe.Customer).email,
      from: process.env.EMAIL,
      subject: trans.subject,
      html: `${trans.intro} <ul><li><a href="http://${req.headers.host}/${
        draft.language !== "en" ? draft.language + "/" : ""
      }download/${draft.uuid}">${trans.download}</a></li><li><a href="http://${
        req.headers.host
      }/${draft.language !== "en" ? draft.language + "/" : ""}change/${
        draft.uuid
      }">${trans.change}</a></li></ul>`,
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

//TODO: Translate all email using the i18n
