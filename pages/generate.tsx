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
      <div>
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
      <div>
        <h1>{t("generate.header")}</h1>
        <p>Here is your PDF preview! Do you like it?</p>
        <button>Remove commercial</button>
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

Generate.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation("common")(Generate);
