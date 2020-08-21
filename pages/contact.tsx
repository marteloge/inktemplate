import { withTranslation } from "../helpers/i18n";
import Layout from "../components/Layout";

const Contact = ({ t }) => (
  <Layout>
    <div className="content">
      <h1>{t("contact.header")}</h1>
    </div>

    <style jsx>{`
      .content {
        margin: 10%;
      }
    `}</style>
  </Layout>
);

export default withTranslation(["common", "meta"])(Contact);
