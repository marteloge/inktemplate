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
      <div className="content">
        <h1>{t(`product:product.${name}.header`)}</h1>
        <p>{t(`product:product.${name}.intro`)}</p>
      </div>
      <style jsx>{`
        .content {
          margin: 5% 10%;
        }
      `}</style>
    </Layout>
  );
};

Product.getInitialProps = async () => ({
  namespacesRequired: ["common", "product", "meta"],
});

export default withTranslation("common")(Product);
