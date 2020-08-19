import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import dynamic from "next/dynamic";

import { withTranslation, Router } from "../../helpers/i18n";
import { getDraft } from "../../helpers/api";
import { downloadPdfDocument } from "../../components/Download";
import Splash from "../../components/Splash";
import Layout from "../../components/Layout";
import Sticky from "../../components/Sticky";
import { Draft } from "../../helpers/types";
import { usePrices } from "../../helpers/hooks";
import { calculateResponsiveSize } from "../../helpers/global";

const PreviewPDF = dynamic(import("../../components/PreviewPDF"), {
  ssr: false,
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const getPrice = (prices, currency) => {
  return prices.data.find((p) => p.currency === currency);
};

const toCheckout = async (uuid, currency, prices) => {
  const { session_id } = await fetch("/api/checkout/session", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      uuid,
      price_id: getPrice(prices, currency).id,
    }),
  }).then((res) => res.json());

  const stripe = await stripePromise;
  const { error } = await stripe.redirectToCheckout({
    sessionId: session_id,
  });
};

const Preview = (props) => {
  const { t } = props;
  const draft: Draft = props.draft;

  const { prices, isLoading } = usePrices();

  const [loadingPayment, setLoadingPayment] = useState(false);
  if (loadingPayment) {
    return <Splash content={"Forbereder betaling"}></Splash>;
  }
  return (
    <Layout>
      <Head>
        <title>{t("meta:generate.title")}</title>
        <meta name="description" content={t("meta:generate.description")} />
      </Head>
      <Sticky>
        <div className="actions">
          <button onClick={() => downloadPdfDocument(draft)}>Download</button>
          <button
            onClick={() =>
              Router.push("/create/[uuid]", `/create/${draft.uuid}`)
            }
          >
            Edit
          </button>
        </div>
      </Sticky>

      <div className="wallpaper">
        <h2>{t("product:painting")}</h2>
      </div>
      <div className="content">
        <div>
          <PreviewPDF draft={draft} />
        </div>

        <div>
          <h1>{t("generate.header")}</h1>

          <div className="premium">
            <p>{t("generate.intro")}</p>

            <p className="benefit">
              {"> " + t("generate.premium.benefit.logo")}
            </p>
            <p className="benefit">
              {"> " + t("generate.premium.benefit.edit")}
            </p>
            <p className="benefit">
              {"> " + t("generate.premium.benefit.email")}
            </p>

            {!isLoading && (
              <>
                <p className="price">
                  {t("generate.premium.price")}:
                  {` $ ${getPrice(prices, "usd").unit_amount / 100}USD`}
                </p>
                <button
                  className="checkout"
                  onClick={() => {
                    setLoadingPayment(true);
                    toCheckout(draft.uuid, "usd", prices);
                  }}
                >
                  Upgrade
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        h1 {
          margin: 0;
        }

        p {
          margin: 20px 0;
        }

        .benefit {
          font-weight: bold;
        }

        .price {
          margin: 25px 0;
          font-weight: bold;
          font-size: ${calculateResponsiveSize(15, 25)};
        }

        .premium {
          border: 1px solid white;
          background: white;
          border-radius: 5px;
          box-shadow: 0px 0px 10px 10px rgba(255, 255, 255);
          margin-right: 10%;
          max-width: 400px;
          padding: 5%;
        }
        .checkout {
          width: 100%;
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
