import { useState } from "react";

import { Link, withTranslation } from "../helpers/i18n";
import { calculateResponsiveSize } from "../helpers/global";

const Navbar = (props) => {
  const { t } = props;

  return (
    <div id="navbar">
      <div id="logo">
        <Link href="/">
          <a>InkTemplate</a>
        </Link>
      </div>
      <div id="nav">
        <Link href="/products">
          <a>{t("create.nav")}</a>
        </Link>
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
