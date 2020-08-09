import { Link, withTranslation, Router } from "./../../i18n";
import { calculateResponsiveSize } from "../global";
import { Draft } from "../types";

const getNewUUID = () => {
  return fetch("http://localhost:8000/draft", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      product_id: 1,
    }),
  }).then((response) => response.json());
};

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
      <a
        className="button"
        onClick={() => {
          getNewUUID().then((result) => Router.push("/create/" + result.uuid));
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

Navbar.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default withTranslation("common")(Navbar);
