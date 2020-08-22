import { withTranslation } from "../helpers/i18n";
import Layout from "../components/Layout";

import { i18n } from "../helpers/i18n";
import { Config } from "next-i18next";

const Language = ({ t }) => {
  const allLanguages = (i18n.options as Config).allLanguages;
  return (
    <Layout>
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
          margin: 10%;
        }

        .languages {
          width: 100%;
          display: flex;
        }

        button {
          margin-right: 1%;
        }
      `}</style>
    </Layout>
  );
};

export default withTranslation(["common"])(Language);
