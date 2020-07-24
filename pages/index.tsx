import Layout from "../src/components/Layout";
import Head from "next/head";

import { i18n, withTranslation } from "../i18n";

import heroImg from "./../public/static/images/hero.jpg";

import Img from "react-optimized-image";

const Home = ({ t }) => (
  <Layout>
    <Head>
      <title>{t("meta:index.title")}</title>
      <meta
        name="description"
        content="Create free printable templates for your invitation, place cards and menus."
      />
    </Head>

    <Img
      src={heroImg}
      webp
      sizes={[400, 800, 1080, 1200, 1900, 2500]}
      alt="Hero background image"
    ></Img>

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

      img {
        width: 100%;
      }
    `}</style>
  </Layout>
);

Home.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation("common")(Home);
