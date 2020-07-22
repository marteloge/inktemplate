import { Link } from "./../i18n";
import { withTranslation } from "./../i18n";

import Layout from "./../src/components/Layout";
import Head from "next/head";

const Products = ({ t }) => (
  <Layout>
    <Head>
      <title>{t("meta:products.title")}</title>
    </Head>
    <h1>{t("products.header")}</h1>

    <Link href="/product/placecard">
      <a>{t("products.placecard.name")}</a>
    </Link>

    <Link href="/product/invitation">
      <a>{t("products.invitation.name")}</a>
    </Link>

    {/* <Link
      href={
        i18n.language == "en" ? "/product/[name]" : "/[lang]/product/[name]"
      }
      as={
        i18n.language == "en"
          ? "/product/test"
          : "/" + i18n.language + "/product/test"
      }
    >
      <a>Test</a>
    </Link> */}
    {/* <Link href="/product/[name]" as="/product/placecard">
      <a>Place Card</a>
    </Link> */}
  </Layout>
);

Products.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation("common")(Products);
