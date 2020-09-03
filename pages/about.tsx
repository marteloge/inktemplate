import { withTranslation } from "../helpers/i18n";
import Layout from "../components/Layout";
import Head from "next/head";

const About = ({ t }) => (
  <Layout>
    <Head>
      <title>{t("meta:about.title")}</title>
      <meta name="description" content={t("meta:about.description")} />
      <meta name="robots" content="index" />
    </Head>
    <div className="content">
      <div className="intro">
        <div>
          <h1>{t("about.header")}</h1>
          <p style={{ whiteSpace: "pre-line" }}>{t("about.intro")}</p>
        </div>
        <img src="/static/images/marte.jpg"></img>
      </div>

      <div className="about">
        <h2>{t("about.feature.header")}</h2>
        <p>{t("about.feature.content")}</p>
      </div>
    </div>

    <style jsx>{`
      .content {
        max-width: 650px;
        margin: 0 auto;
        padding: 5%;
      }

      img {
        border-radius: 100%;
        max-width: 250px;
        margin: 1%;
      }

      .intro {
        display: flex;
      }

      .about {
        margin: 5% 0;
      }

      @media (max-width: 550px) {
        .intro {
          flex-direction: column;
        }
      }
    `}</style>
    <style jsx global>{`
      footer {
        position: absolute;
      }
    `}</style>
  </Layout>
);

About.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation("common")(About);
