import { Link, withTranslation } from "./../../i18n";
import { calculateResponsiveSize } from "../global";

const Navbar = ({ t }) => (
  <div id="navbar">
    <div id="logo">
      <Link href="/">
        <a>InkTemplate</a>
      </Link>
    </div>
    <div id="nav">
      <Link href="/about">
        <a>{t("about.nav")}</a>
      </Link>
      <Link href="/products">
        <a>{t("products.nav")}</a>
      </Link>
      <Link href="/create">
        <a className="button">{t("create.nav")}</a>
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

Navbar.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default withTranslation("common")(Navbar);
