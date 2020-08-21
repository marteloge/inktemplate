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
    return <Splash content="Finding pencils and crayons!"></Splash>;
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
          className="button"
          onClick={() => {
            setLoading(true);
            const uuid = newUUID();
            createOrUpdateDraft(uuid, newDraft("PLACECARD", uuid)).then(
              (uuid) => {
                Router.push(`/create/[uuid]?uuid=${uuid}`, `/create/${uuid}`);
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
          box-shadow: 20px 20px 30px rgba(255, 255, 255, 1);
        }

        a {
          font-family: "Raleway";
          font-weight: 400;
          font-size: ${calculateResponsiveSize(12, 18)};
          margin: 1.8vmin;
        }

        #logo a {
          font-family: "Playfair Display";
          font-size: ${calculateResponsiveSize(18, 45)};
          font-weight: bold;
        }

        .button {
          background-color: rgba(256, 256, 256, 0.7);
          padding: 10px 15px;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default withTranslation("common")(Navbar);
