import Head from "next/head";
import dynamic from "next/dynamic";
import { loadStripe } from "@stripe/stripe-js";

import { withTranslation } from "../../i18n";
import { getDraft } from "../../src/api";
import Layout from "../../src/components/Layout";
import { generatePdfDocument } from "./../../src/components/print/Download";

const PreviewPDF = dynamic(import("../../src/components/print/PreviewPDF"), {
  ssr: false,
});

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

const Preview = (props) => {
  const { t, draft } = props;

  return (
    <Layout>
      <Head>
        <title>{t("meta:generate.title")}</title>
        <meta name="description" content={t("meta:generate.description")} />
      </Head>
      <div className="wallpaper">
        <h2>{t("product:painting")}</h2>
      </div>

      <div className="content">
        <div>
          <PreviewPDF draft={draft}></PreviewPDF>
        </div>
        <div>
          <h1>{t("generate.header")}</h1>
          <button role="link" onClick={() => toCheckout(draft.uuid)}>
            Checkout
          </button>
          <button onClick={() => generatePdfDocument(draft)}>Download</button>
        </div>
      </div>

      <style jsx>{`
        h1 {
          margin: 0;
        }

        p {
          margin: 20px 0;
        }
      `}</style>

      <style jsx global>{`
        .wallpaper {
          width: 100vw;
          height: 100vh;
          position: fixed;
          background-color: rgb(242, 238, 235);
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 1;
        }

        .container {
          background-color: rgb(242, 238, 235);
        }

        .content {
          height: 100%;
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: row;
          margin: 3% 0;
        }

        .content > div {
          width: 50%;
          padding-left: 4%;
        }

        .react-pdf__Page__svg {
          max-width: 50vw;
          height: auto;
          border-radius: 5px;
          background-color: rgb(242, 238, 235) !important;
        }

        svg {
          max-width: 50vw;
          height: auto;
        }
      `}</style>
    </Layout>
  );
};

Preview.getInitialProps = async ({ query }) => {
  const draft = await getDraft(query.uuid);

  return {
    draft: draft,
    namespacesRequired: ["common", "meta", "product"],
  };
};

export default withTranslation("common")(Preview);
