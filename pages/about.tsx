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
        padding: 5% 5% 20% 5%;
      }

      img {
        border-radius: 100%;
        max-width: 300px;
        box-shadow: 5px 5px 15px gray;
      }
      .intro {
        display: flex;
      }
    `}</style>
    <style jsx global>{`
      .container {
        background-color: #f2eeeb;
      }
    `}</style>
  </Layout>
);

About.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation("common")(About);
