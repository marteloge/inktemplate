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
    <img
      className="hero"
      srcSet="/static/images/background-flower-1-1920.jpg 1920w,
              /static/images/background-flower-1-1536.jpg 1536w,
              /static/images/background-flower-1-1440.jpg 1440w,
              /static/images/background-flower-1-1366.jpg 1366w,
              /static/images/background-flower-1-1280.jpg 1280w,
              /static/images/background-flower-1-800.jpg 800w,
              /static/images/background-flower-1-480.jpg 480w"
      src="/static/images/background-flower-1-800.jpg"
      alt="Print templates"
    />
    <div>
      <h1>Paper card print!</h1>
      <p>
        Find your paper print template for all occations - weddings, birthdays
        or celebrations. Pick a design and provide a list - we will do the rest.
        Invitations, place cards, save the date and much more.
      </p>
    </div>

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

    <footer></footer>
    <style jsx global>{`
      #navbar {
        position: fixed;
      }
    `}</style>
  </Layout>
);

Home.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation("common")(Home);
