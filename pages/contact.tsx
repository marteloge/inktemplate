import { withTranslation } from "../helpers/i18n";
import Layout from "../components/Layout";
import Head from "next/head";

const Contact = ({ t }) => (
  <Layout>
    <Head>
      <title>{t("meta:contact.title")}</title>
      <meta name="description" content={t("meta.contact.description")} />
      <meta name="robots" content="index" />
    </Head>
    <div className="content">
      <h1>{t("contact.header")}</h1>
      <p>{t("contact.intro")}</p>
    </div>

    <style jsx>{`
      .content {
        margin: 10%;
      }
    `}</style>

    <style jsx global>{`
      footer {
        position: absolute;
      }
    `}</style>
  </Layout>
);

Contact.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation("common")(Contact);
