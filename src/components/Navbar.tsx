import { Link, withTranslation } from "./../../i18n";

const Navbar = ({ t }) => (
  <div>
    <Link href="/">
      <a>{t("home.nav")}</a>
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
  </div>
);

Navbar.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default withTranslation("common")(Navbar);
