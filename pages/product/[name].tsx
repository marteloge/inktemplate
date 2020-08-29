import { useRouter } from "next/router";
import Head from "next/head";

import { withTranslation } from "../../helpers/i18n";
import Layout from "../../components/Layout";

const Product = ({ t }) => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <Layout>
      <Head>
        <title>{t(`meta:product.${name}.title`)}</title>
        <meta
          name="description"
          content={t(`meta:product.${name}.description`)}
        />
        <meta name="robots" content="index" />
      </Head>
      <h1>Product - {name}</h1>
    </Layout>
  );
};

Product.getInitialProps = async () => ({
  namespacesRequired: ["meta"],
});

export default withTranslation("meta")(Product);
