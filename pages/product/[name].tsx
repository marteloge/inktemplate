import { useRouter } from "next/router";

import Layout from "./../../src/components/Layout";
import { withTranslation } from "../../i18n";

const Product = () => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <Layout>
      <h1>Product - {name}</h1>
    </Layout>
  );
};

Product.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default withTranslation("common")(Product);
