import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import dynamic from "next/dynamic";

import { withTranslation, Router } from "../../helpers/i18n";
import { getDraft } from "../../helpers/api";
import { downloadPdfDocument } from "../../components/Download";
import { Draft } from "../../helpers/types";
import { usePrices } from "../../helpers/hooks";
import { calculateResponsiveSize } from "../../helpers/global";

import Splash from "../../components/Splash";
import Layout from "../../components/Layout";
import Sticky from "../../components/Sticky";

const PreviewPDF = dynamic(import("../../components/PreviewPDF"), {
  ssr: false,
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const getPrice = (prices, currency) => {
  return prices ? prices.data.find((p) => p.currency === currency) : null;
};

const toCheckout = async (draft, currency, prices) => {
  const { session_id } = await fetch("/api/checkout/session", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      language: draft.language,
      uuid: draft.uuid,
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
  const { prices, isLoadingPrices } = usePrices();
  const [loadingPayment, setLoadingPayment] = useState(false);

  if (loadingPayment) {
    return <Splash content={"Forbereder betaling"}></Splash>;
  }

  if (!draft) {
    return <></>;
  }

  return (
    <Layout>
      <Head>
        <title>{t("meta:preview.title")}</title>
        <meta name="description" content={t("meta:preview.description")} />
        <meta name="robots" content="noindex" />
      </Head>
      <Sticky>
        <div className="actions">
          <button onClick={() => downloadPdfDocument(draft)}>
            {t("generate.download")}
          </button>
          {!draft.paid && (
            <button
              onClick={() =>
                Router.push(
                  `/create/[uuid]?uuid=${draft.uuid}`,
                  `/create/${draft.uuid}`
                )
              }
            >
              {t("generate.change")}
            </button>
          )}
        </div>
      </Sticky>

      <div className="wallpaper">
        <h2>{t("product:painting")}</h2>
      </div>
      <div className="content">
        <div className="pdf">
          {draft && prices && <PreviewPDF draft={draft} />}
        </div>

        <div className="upgrade">
          <div className="premium">
            <h1>{t("generate.header")}</h1>
            {draft.paid && <p>{t("create.paid")}</p>}
            {!draft.paid && (
              <>
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

                {!isLoadingPrices && (
                  <>
                    <p className="price">
                      {t("generate.premium.price")}:
                      {` $ ${getPrice(prices, "usd").unit_amount / 100}USD`}
                    </p>
                    <button
                      className="checkout"
                      onClick={() => {
                        setLoadingPayment(true);
                        toCheckout(draft, "usd", prices);
                      }}
                    >
                      {t("generate.premium.upgrade")}
                    </button>
                  </>
                )}
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
          margin-top: 5%;
        }

        .checkout {
          width: 100%;
        }

        @media (max-width: 750px) {
          .upgrade {
            width: 100%;
            margin-bottom: 10vh;
          }
          .premium {
            padding: 0 5%;
            margin: 0 auto;
            background: transparent;
            box-shadow: none;
            border: none;
            width: 90%;
          }
        }
      `}</style>
      <style jsx global>{`
        footer {
          display: none !important;
        }
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

        .content {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: row;
          margin-top: 5%;
        }

        .content > div {
          width: 50%;
          padding-left: 4%;
        }

        .react-pdf__Page__svg {
          max-width: 50vw;
          border-radius: 5px;
          background-color: rgb(242, 238, 235) !important;
        }

        svg {
          max-width: 50vw;
          height: auto;
        }

        @media (max-width: 750px) {
          .content > div {
            width: 100%;
            padding: 0;
          }

          .content {
            flex-direction: column;
          }

          .react-pdf__Page__svg {
            max-width: 90vw;
          }
          svg {
            max-width: 90vw;
          }

          .react-pdf__Page__svg {
            max-height: 65vh;
          }
        }

        @media (max-width: 700px) {
          .react-pdf__Page__svg {
            max-height: 60vh;
          }
        }

        @media (max-width: 650px) {
          .react-pdf__Page__svg {
            max-height: 55vh;
          }
        }

        @media (max-width: 600px) {
          .react-pdf__Page__svg {
            max-height: 52vh;
          }
        }

        @media (max-width: 550px) {
          .react-pdf__Page__svg {
            max-height: 47vh;
          }
        }

        @media (max-width: 500px) {
          .react-pdf__Page__svg {
            max-height: 42vh;
          }
        }

        @media (max-width: 450px) {
          .react-pdf__Page__svg {
            max-height: 37vh;
          }
        }

        @media (max-width: 350px) {
          .react-pdf__Page__svg {
            max-height: 30vh;
          }
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
