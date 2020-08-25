import { useState } from "react";

import { Link, Router, withTranslation, i18n } from "../helpers/i18n";
import { calculateResponsiveSize, newUUID } from "../helpers/global";
import { createOrUpdateDraft } from "../helpers/api";
import { newDraft } from "../helpers/products";

import Splash from "./Splash";

const Navbar = (props) => {
  const { t } = props;
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Splash confetti={true} content={t("confetti")}></Splash>;
  }

  return (
    <div id="navbar">
      <div id="logo">
        <Link href="/">
          <a>InkTemplate</a>
        </Link>
      </div>
      <div id="nav">
        <Link href="/products">
          <a>{t("products.nav")}</a>
        </Link>

        <a
          onClick={() => {
            setLoading(true);
            const uuid = newUUID();
            const start = new Date();

            createOrUpdateDraft(uuid, newDraft("PLACECARD", uuid)).then(
              (uuid) => {
                setTimeout(
                  () =>
                    Router.push(
                      `/create/[uuid]?uuid=${uuid}`,
                      `/create/${uuid}`
                    ),
                  2500 - (new Date().getTime() - start.getTime())
                );
              }
            );
          }}
        >
          {t("create.nav")}
        </a>
      </div>

      <style jsx>{`
        #navbar {
          width: 100%;
          top: 0;
          background-color: white;
          padding: 10px 0;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0px 0px 20px 20px rgba(255, 255, 255, 1);
        }

        a {
          font-family: "Raleway";
          font-weight: 400;
          font-size: ${calculateResponsiveSize(14, 18)};
          margin: 1.8vmin;
        }

        #logo a {
          font-family: "Playfair Display";
          font-size: ${calculateResponsiveSize(25, 45)};
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default withTranslation("common")(Navbar);
