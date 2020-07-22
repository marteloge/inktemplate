import { i18n, Link } from "./../../i18n";

const Navbar = () => (
  <div>
    <Link href="/">
      <a>{i18n.t("home")}</a>
    </Link>
    <Link href="/about">
      <a>{i18n.t("about")}</a>
    </Link>
    <Link href="/products">
      <a>{i18n.t("products")}</a>
    </Link>
    <Link href="/create">
      <a>{i18n.t("create")}</a>
    </Link>
  </div>
);

export default Navbar;
