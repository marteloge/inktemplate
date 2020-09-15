import { useState, useEffect, useRef } from "react";
import Head from "next/head";

import {
  newUUID,
  calculateResponsiveSize,
  getCuratedDesign,
} from "../helpers/global";
import { createOrUpdateDraft, logEvent } from "../helpers/api";
import { withTranslation, Router } from "../helpers/i18n";
import { newDraft } from "../helpers/products";
import { Draft } from "../helpers/types";
import Layout from "../components/Layout";
import Canvas from "../components/Canvas";
import Splash from "../components/Splash";

const Home = ({ t }) => {
  const [draft, setDraft] = useState<Draft>(newDraft("PLACECARD", "uuid"));
  const [loading, setLoading] = useState(false);
  const intervalId = useRef();

  useEffect(() => {
    (intervalId as any).current = setInterval(() => {
      setDraft(getCuratedDesign(newDraft("PLACECARD", "uuid")));
    }, 3500);
    return () => clearInterval(intervalId.current);
  }, []);

  if (loading) {
    return <Splash confetti={true} content={t("splash.confetti")}></Splash>;
  }

  return (
    <Layout>
      <Head>
        <title>{t("meta:index.title")}</title>
        <meta name="description" content={t("meta:index.description")} />
        <meta name="robots" content="index" />
      </Head>

      <div className="content">
        <div className="preview">
          <Canvas
            width={draft.product.width}
            height={draft.product.height}
            scale={1}
            useDesign={draft.useDesign}
            selectedDesign={draft.backgroundImage}
            backgroundColor={"white"}
            content={
              draft.content.length === 1
                ? [
                    { ...draft.content[0], text: t("product:nameText") },
                    { ...draft.content[0], text: "" },
                  ]
                : [
                    { ...draft.content[0], text: t("product:nameText") },
                    { ...draft.content[1], text: t("product:subText") },
                  ]
            }
          ></Canvas>
          <img
            className="refresh"
            src="/static/images/reload.png"
            onClick={() => {
              clearInterval(intervalId.current);
              setDraft(getCuratedDesign(newDraft("PLACECARD", "uuid")));
            }}
          />
        </div>
        <div className="start">
          <h1 className="strike">{t("home.header")}</h1>
          <p>{t("home.intro")}</p>

          <button
            className="button create"
            onClick={() => {
              const start = new Date();
              setLoading(true);
              const uuid = newUUID();
              logEvent("landingpage_create_placecard");
              createOrUpdateDraft(uuid, {
                ...draft,
                content:
                  draft.content.length === 1
                    ? [
                        draft.content[0],
                        newDraft("PLACECARD", "uuid").content[1],
                      ]
                    : draft.content,
                uuid,
              }).then((uuid) => {
                setTimeout(
                  () =>
                    Router.push(
                      `/create/[uuid]?uuid=${uuid}`,
                      `/create/${uuid}`
                    ),
                  2500 - (new Date().getTime() - start.getTime())
                );
              });
            }}
          >
            {t("home.button.create")}
          </button>
        </div>
      </div>

      <style jsx>{`
        .content {
          padding-top: 5%;
          display: flex;
          justify-content: center;
          max-width: 800px;
          margin: 0 auto;
          min-height: 100%;
        }

        .content div {
          margin: 10px;
        }

        @keyframes spin-animation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .refresh {
          margin-top: 15px;
          cursor: pointer;
          width: ${calculateResponsiveSize(30, 35)};
        }

        .refresh:hover {
          animation: spin-animation 4s infinite;
          display: inline-block;
        }

        div.preview {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        button {
          border: 3px solid #32c0b0;
          background: transparent;
          margin: 8% 0;
          min-width: 200px;
          font-size: ${calculateResponsiveSize(18, 20)};
        }

        @media (max-width: 750px) {
          .content {
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-bottom: 10%;
          }

          .content div {
            margin-top: 5%;
          }

          .start {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .start p {
            width: 70%;
          }
        }
      `}</style>
      <style jsx global>{`
        .examples div.preview {
          margin-right: 10px;
        }

        @media (max-width: 750px) {
          .examples div.preview {
            margin-right: 0;
          }

          .carousel {
            display: none !important;
          }
        }

        footer {
          position: absolute;
        }
      `}</style>
    </Layout>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta", "product"],
});

export default withTranslation("common")(Home);
