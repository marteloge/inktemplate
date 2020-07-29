import { withTranslation } from "./../i18n";
import Layout from "./../src/components/Layout";
import Head from "next/head";

import dynamic from "next/dynamic";

const PreviewPDF = dynamic(import("./../src/components/Print/PreviewPDF"), {
  ssr: false,
});

const Generate = ({ t }) => (
  <Layout>
    <Head>
      <title>{t("meta:generate.title")}</title>
      <meta name="description" content={t("meta:generate.description")} />
    </Head>
    <div className="wallpaper">
      <h2>Painting your print!</h2>
    </div>
    <div className="content">
      <h1>{t("generate.header")}</h1>

      <PreviewPDF
        backgroundImage="/static/images/template4.jpg"
        text={[
          "ola, bord1",
          "kari, bord2",
          "Håkon, bord3",
          "jepp, bord5",
          "test, bord1",
          "lll,  bord3",
          "olaaa, bord1",
          "kariaa, bord2",
          "Håkonaa, bord3",
          "jeppaa, bord5",
          "testaa, bord1",
          "lllaa,  bord3",
        ]}
        nameText={{ font: "Raleway", fontSize: 35 * 0.6, color: "hotpink" }}
        subText={{ font: "Raleway", fontSize: 20 * 0.6, color: "yellow" }}
      ></PreviewPDF>
    </div>

    <style jsx>{`
      .content {
        margin: 5%;
      }
    `}</style>

    <style jsx global>{`
      .wallpaper {
        width: 100vw;
        height: 100vh;
        position: fixed;
        background-color: white;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .wallpaper h1 {
        animation: blinker 1s linear infinite;
      }

      .preview {
        height: auto;
        margin: auto;
        width: 100%;
      }

      .viewer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .react-pdf__Page {
        // width: 70%;
        max-width: 100vw;
        height: auto;
        display: fixed;
        overflow: visible;
      }

      .react-pdf__Page__svg {
        // width: 70%;
        max-width: 100vw;

        height: auto;
        overflow: visible;
      }

      .react-pdf__Page__svg svg {
        // width: 70%;
        max-width: 100vw;

        height: auto;
        overflow: visible;
      }
    `}</style>
  </Layout>
);

Generate.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation("common")(Generate);
