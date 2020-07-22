import { withTranslation } from "./../i18n";
import Layout from "./../src/components/Layout";
import Head from "next/head";

const About = ({ t }) => (
  <Layout>
    <Head>
      <title>{t("meta:about.title")}</title>
    </Head>
    <h1>{t("about.header")}</h1>
  </Layout>
);

About.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation("common")(About);
