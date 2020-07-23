import { useRouter } from "next/router";
import Head from "next/head";

import { withTranslation } from "../../i18n";
import Layout from "./../../src/components/Layout";

const Product = () => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <Layout>
      <Head>
        <title>InkTemplate - {name}</title>
        <meta name="description" content={"" + name} />
      </Head>
      <h1>Product - {name}</h1>
    </Layout>
  );
};

Product.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default withTranslation("common")(Product);
