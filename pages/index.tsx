import Layout from "../src/components/Layout";
import Head from "next/head";

import { i18n, withTranslation } from "../i18n";

const Home = ({ t }) => (
  <Layout>
    <Head>
      <title>{t("meta:index.title")}</title>
      <meta
        name="description"
        content="Create free printable templates for your invitation, place cards and menus."
      />
    </Head>

    <div className="content">
      <h1>Paper card print!</h1>
      <p>
        Find your paper print template for all occations - weddings, birthdays
        or celebrations. Pick a design and provide a list - we will do the rest.
        Invitations, place cards, save the date and much more.
      </p>
      <button
        type="button"
        onClick={() => {
          i18n.changeLanguage(i18n.language === "en" ? "no" : "en").then(() => {
            location.replace("/");
          });
        }}
      >
        {t("changeLang")}
      </button>
    </div>

    <footer></footer>
    <style jsx>{`
      .content {
        padding: 10%;
      }

      button {
        padding: 10px 20px;
      }
    `}</style>
    <style jsx global>{`
      .container {
        background-color: rgba(238, 233, 231, 0.8);
      }
    `}</style>
  </Layout>
);

Home.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation("common")(Home);
