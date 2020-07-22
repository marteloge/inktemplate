import Layout from "../src/components/Layout";

import { withTranslation } from "./../i18n";
import Head from "next/head";

const Create = ({ t }) => (
  <Layout>
    <Head>
      <title>{t("meta:create.title")}</title>
    </Head>
    <h1>{t("create.header")}</h1>
  </Layout>
);

Create.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation("common")(Create);
