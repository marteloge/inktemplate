import { withTranslation } from "../helpers/i18n";
import Layout from "../components/Layout";
import Head from "next/head";

const About = ({ t }) => (
  <Layout>
    <Head>
      <title>{t("meta:about.title")}</title>
      <meta name="description" content={t("meta:about.description")} />
    </Head>
    <div className="content">
      <h1>{t("about.header")}</h1>
    </div>

    <style jsx>{`
      .content {
        margin: 10%;
      }
    `}</style>
  </Layout>
);

About.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation("common")(About);
