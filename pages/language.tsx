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
              className="strike"
              type="button"
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
        footer {
          position: absolute;
        }
      `}</style>

      <style jsx>{`
        .content {
          margin: 5%;
        }

        .languages {
          display: flex;
        }

        button {
          border: none;
          margin-right: 2%;
          background: #f2eeeb;
        }
      `}</style>
    </Layout>
  );
};

Language.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation(["common"])(Language);
