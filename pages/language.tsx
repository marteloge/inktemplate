import { withTranslation } from "../helpers/i18n";
import Layout from "../components/Layout";

import { i18n } from "../helpers/i18n";
import { Config } from "next-i18next";
import { calculateResponsiveSize } from "../helpers/global";
import Head from "next/head";

const Language = ({ t }) => {
  const allLanguages = (i18n.options as Config).allLanguages;
  return (
    <Layout>
      <Head>
        <title>{t("meta:language.title")}</title>
        <meta name="description" content={t("meta:language.description")} />
        <meta name="robots" content="noindex" />
      </Head>
      <div className="content">
        <h1>{t("language.header")}</h1>
        <div className="languages">
          {allLanguages.map((lang, i) => (
            <button
              key={i}
              type="button"
              style={{ backgroundColor: "rgba(256, 256, 256, 1)" }}
              onClick={() => {
                i18n.changeLanguage(lang).then(() => {
                  location.replace("/");
                });
              }}
            >
              {t(`languages.${lang}`)}
            </button>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .container {
          background-color: rgba(238, 233, 231, 0.8);
        }
      `}</style>

      <style jsx>{`
        .content {
          margin: 5%;
        }

        .languages {
          width: 100%;
          display: flex;
        }

        button {
          border: none;
          padding: 10px 40px;
          box-shadow: 3px 3px 3px 5px rgb(255 255 255);
          border: 2px solid rgb(256, 256, 256, 0.6);
          border-radius: 10px;
          margin-right: 3%;
          font-family: "Dawning of a New Day";
          font-size: ${calculateResponsiveSize(20, 30)};
        }
      `}</style>
    </Layout>
  );
};

Language.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation(["common"])(Language);
