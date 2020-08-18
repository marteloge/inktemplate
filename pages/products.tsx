import { Link } from "../helpers/i18n";
import { withTranslation } from "../helpers/i18n";

import Layout from "../components/Layout";
import Head from "next/head";

const Products = ({ t }) => (
  <Layout>
    <Head>
      <title>{t("meta:products.title")}</title>
      <meta name="description" content={t("meta:products.description")} />
    </Head>
    <div className="content">
      <h1>{t("products.header")}</h1>

      <Link href="/product/placecard">
        <a>{t("products.placecard.name")}</a>
      </Link>

      <Link href="/product/invitation">
        <a>{t("products.invitation.name")}</a>
      </Link>
    </div>

    <style jsx>{`
      .content {
        margin: 10%;
      }
    `}</style>
  </Layout>
);

Products.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation("common")(Products);
