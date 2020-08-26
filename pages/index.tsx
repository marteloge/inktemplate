import Layout from "../components/Layout";
import Head from "next/head";

import { withTranslation, Link, Router } from "../helpers/i18n";
import Canvas from "../components/Canvas";
import { newDraft, newCanvas } from "../helpers/products";
import { Draft } from "../helpers/types";
import { useState } from "react";
import Splash from "../components/Splash";
import { newUUID, calculateResponsiveSize } from "../helpers/global";
import { createOrUpdateDraft } from "../helpers/api";
import Carousel from "../components/Carousel";

const Home = ({ t }) => {
  const draft: Draft = newDraft("PLACECARD", "uuid");
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Splash confetti={true} content={t("splash.confetti")}></Splash>;
  }

  return (
    <Layout>
      <Head>
        <title>{t("meta:index.title")}</title>
        <meta
          name="description"
          content="Create free printable templates for your invitation, place cards and menus."
        />
      </Head>

      <div className="content">
        <div className="preview">
          <Canvas
            width={draft.product.width}
            height={draft.product.height}
            scale={1}
            useDesign={draft.useDesign}
            selectedDesign={"template4"}
            backgroundColor={"white"}
            content={[
              {
                order: 1,
                name: "nameText",
                font: "Dawning of a New Day",
                fontSize: 35,
                fontSrc: "dawning-of-a-new-day-v11-latin-regular",
                color: "#000000",
                text: t("product:nameText"),
                colorPickerOpen: false,
              },
              {
                order: 2,
                name: "subText",
                font: "Raleway",
                fontSize: 20,
                fontSrc: "raleway-v17-latin-regular",
                color: "#000000",
                text: t("product:subText"),
                colorPickerOpen: false,
              },
            ]}
          ></Canvas>
        </div>
        <div className="start">
          <h1>{t("home.header")}</h1>
          <p>{t("home.intro")}</p>
          <button
            className="button create"
            onClick={() => {
              const start = new Date();
              setLoading(true);
              const uuid = newUUID();
              createOrUpdateDraft(uuid, newDraft("PLACECARD", uuid)).then(
                (uuid) => {
                  setTimeout(
                    () =>
                      Router.push(
                        `/create/[uuid]?uuid=${uuid}`,
                        `/create/${uuid}`
                      ),
                    2500 - (new Date().getTime() - start.getTime())
                  );
                }
              );
            }}
          >
            {t("home.button.create")}
          </button>
        </div>
      </div>

      <Carousel />

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
        .start button {
          width: 95%;
        }

        button {
          border: none;
          background: transparent;
          padding: 10px 40px;
          box-shadow: 5px 5px 15px rgb(255 255 255);
          border: 2px solid rgb(256, 256, 256, 0.6);
          border-radius: 10px;
        }

        .create {
          margin-top: 5%;
          font-family: "Dawning of a New Day";
          font-size: ${calculateResponsiveSize(22, 30)};
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
          .start button {
            width: 70%;
          }
        }
      `}</style>
      <style jsx global>{`
        .container {
          min-height: 100vh;
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
