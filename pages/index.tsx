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

const Home = ({ t }) => {
  const draft: Draft = newDraft("PLACECARD", "uuid");
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Splash confetti={true} content={t("confetti")}></Splash>;
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
        <div>
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
        <div>
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

      <div className="carousel">
        <div className="scroll right">
          <p>{">"}</p>
        </div>

        <div className="scroll left">
          <p>{"<"}</p>
        </div>

        <div className="examples">
          <Canvas
            {...newCanvas({
              texts: [t("product:nameText"), t("product:subText")],
              selectedDesign: "template1",
            })}
          ></Canvas>
          <Canvas
            {...newCanvas({
              texts: [t("product:nameText"), t("product:subText")],
              selectedDesign: "template2",
            })}
          ></Canvas>
          <Canvas
            {...newCanvas({
              texts: [t("product:nameText"), t("product:subText")],
              selectedDesign: "template3",
            })}
          ></Canvas>
          <Canvas
            {...newCanvas({
              texts: [t("product:nameText"), t("product:subText")],
              selectedDesign: "template4",
            })}
          ></Canvas>
          <Canvas
            {...newCanvas({
              texts: [t("product:nameText"), t("product:subText")],
              selectedDesign: "template5",
            })}
          ></Canvas>
          <Canvas
            {...newCanvas({
              texts: [t("product:nameText"), t("product:subText")],
              selectedDesign: "template6",
            })}
          ></Canvas>
          <Canvas
            {...newCanvas({
              texts: [t("product:nameText"), t("product:subText")],
              selectedDesign: "template7",
            })}
          ></Canvas>
          <Canvas
            {...newCanvas({
              texts: [t("product:nameText"), t("product:subText")],
              selectedDesign: "template8",
            })}
          ></Canvas>
        </div>
      </div>

      <footer>
        <div>
          <Link href="/about">
            <a>{t("about.nav")}</a>
          </Link>
          <Link href="/contact">
            <a>{t("contact.nav")}</a>
          </Link>
          <Link href="/language">
            <a>{t("language.nav")}</a>
          </Link>
        </div>
        <div className="copyrights">
          <p>Copyright {new Date().getFullYear()} - InkTemplate</p>
        </div>
      </footer>

      <style jsx>{`
        .scroll {
          position: absolute;
          padding: 10px;
          width: 2%;
          background-color: #f2eeeb;
          min-height: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px 10px rgb(242, 238, 235);
        }

        .scroll.left {
          left: 0;
          border-top-right-radius: 100px;
          border-bottom-right-radius: 100px;
        }

        .scroll.right {
          right: 0;
          border-top-left-radius: 100px;
          border-bottom-left-radius: 100px;
        }

        .scroll p {
          height: 100%;
          font-size: 20px;
          color: #726a61;
        }

        .carousel {
          width: 100%;
          margin: 5% 0;
          padding-bottom: 1%;
          display: flex;
          overflow-y: scroll;
          justify-content: space-between;
          align-items: center;
        }

        .carousel::-webkit-scrollbar {
          display: none;
        }

        .examples {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .copyrights p {
          color: #c1b8af;
          margin: 10px;
        }

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

        button {
          border: none;
          background: transparent;
          font-size: 18px;
          // text-decoration: underline;
          padding: 10px;
          background: white;
          box-shadow: 0 0 10px 10px rgb(255 255 255);
        }

        .create {
          margin-top: 5%;
          font-family: "Dawning of a New Day";
          font-size: ${calculateResponsiveSize(25, 35)};
        }

        footer {
          bottom: 0;
          position: absolute;
          background-color: white;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          background-color: #f2eeeb;
        }

        footer div {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        }

        footer a {
          margin: 0 2%;
        }

        @media (max-width: 750px) {
          .content {
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-bottom: 10%;
          }

          .content div {
            margin-top: 10%;
          }

          button.create {
            margin-top: 30px;
            box-shadow: 0 0 10px 10px rgb(50, 192, 176);
            text-decoration: none;
            padding: 10px 20px;
            color: white;
            font-weight: bold;
            background-color: #32c0b0;
          }

          .carousel {
            display: none;
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
        }
      `}</style>
    </Layout>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta", "product"],
});

export default withTranslation("common")(Home);
