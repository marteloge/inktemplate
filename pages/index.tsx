import Layout from "../components/Layout";
import Head from "next/head";

import { withTranslation, Router } from "../helpers/i18n";
import Canvas from "../components/Canvas";
import { newDraft } from "../helpers/products";
import { Draft } from "../helpers/types";
import { useState, useEffect, useRef } from "react";
import Splash from "../components/Splash";
import {
  newUUID,
  calculateResponsiveSize,
  numDesigns,
  fonts,
  randomColor,
} from "../helpers/global";
import { createOrUpdateDraft } from "../helpers/api";

const randomChange = (draft: Draft): Draft => {
  const font1 = fonts[Math.floor(Math.random() * fonts.length)];
  const font2 = fonts[Math.floor(Math.random() * fonts.length)];

  return {
    ...draft,
    backgroundImage: Math.floor(Math.random() * numDesigns + 1),
    content: [
      {
        ...draft.content[0],
        fontSrc: font1.src,
        font: font1.label,
        color: randomColor(),
      },
      {
        ...draft.content[1],
        fontSrc: font2.src,
        font: font2.label,
        color: randomColor(),
      },
    ],
  };
};

const Home = ({ t }) => {
  const [draft, setDraft] = useState<Draft>(newDraft("PLACECARD", "uuid"));
  const [loading, setLoading] = useState(false);

  const intervalId = useRef();

  useEffect(() => {
    (intervalId as any).current = setInterval(() => {
      setDraft(randomChange(draft));
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
            content={[
              { ...draft.content[0], text: t("product:nameText") },
              { ...draft.content[1], text: t("product:subText") },
            ]}
          ></Canvas>
          <img
            className="refresh"
            src="/static/images/reload.png"
            onClick={() => {
              clearInterval(intervalId.current);
              setDraft(randomChange(draft));
            }}
          />
        </div>
        <div className="start">
          <h1>{t("home.header")}</h1>
          <p>{t("home.intro")}</p>
          <button
            className="button create strike"
            onClick={() => {
              const start = new Date();
              setLoading(true);
              const uuid = newUUID();
              createOrUpdateDraft(uuid, { ...draft, uuid }).then((uuid) => {
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
          border: none;
        }

        .strike {
          display: inline-block;
          position: relative;
          font-size: 30px;
          background-color: transparent;
          z-index: 1;
          padding: 10px 0;
        }

        .strike::after {
          content: "";
          display: block;
          width: 100%;
          height: 7px;
          background: #32c0b0;
          position: absolute;
          bottom: 30%;
          box-shadow: 0px 0px 2px 2px #32c0b0;
          border-radius: 1px;
          z-index: -1;
        }

        .strike:hover ::after {
          transform: scaleX(1.09);
          padding-left: 10px;
          transition: all 0.4s ease-in-out 0s;
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
        .container {
          background-color: #f2eeeb;
        }

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

        .container div#navbar {
          box-shadow: none;
          background-color: transparent;
        }
      `}</style>
    </Layout>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta", "product"],
});

export default withTranslation("common")(Home);
