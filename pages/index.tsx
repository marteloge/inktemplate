import Layout from "../components/Layout";
import Head from "next/head";

import { i18n, withTranslation, Link } from "../helpers/i18n";

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

    <footer>
      <Link href="/about">
        <a>{t("about.nav")}</a>
      </Link>
      <Link href="/contact">
        <a>{t("contact.nav")}</a>
      </Link>
    </footer>
    <style jsx>{`
      .content {
        padding: 10%;
      }

      button {
        padding: 10px 20px;
      }

      footer {
        bottom: 0;
        position: fixed;
        padding: 1%;
        background-color: white;
        width: 100%;
        box-shadow: 0px 0px 20px 20px rgba(256, 256, 256, 1);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      footer a {
        margin: 0 2%;
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
  namespacesRequired: ["common", "meta", "product"],
});

export default withTranslation("common")(Home);
