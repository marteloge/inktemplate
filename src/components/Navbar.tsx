import { Link, withTranslation } from "./../../i18n";

const Navbar = ({ t }) => (
  <div>
    <Link href="/">
      <a id="logo">InkTemplate</a>
    </Link>
    <Link href="/about">
      <a>{t("about.nav")}</a>
    </Link>
    <Link href="/products">
      <a>{t("products.nav")}</a>
    </Link>
    <Link href="/create">
      <a>{t("create.nav")}</a>
    </Link>
    <style jsx>{`
      a {
        font-family: "Raleway", sans-serif;
      }
      #logo {
        font-family: "Playfair Display", serif;
        font-size: 40px;
      }
    `}</style>
  </div>
);

Navbar.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default withTranslation("common")(Navbar);
