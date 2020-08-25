import { withTranslation, Link } from "../helpers/i18n";

const Footer = (props) => {
  const { t } = props;
  return (
    <footer>
      <div className="links">
        <Link href="/about">
          <a>{t("about.nav")}</a>
        </Link>
        <Link href="/contact">
          <a>{t("contact.nav")}</a>
        </Link>
        <Link href="/language">
          <a>{t("language.nav")}</a>
        </Link>
      </div>
      <div className="copyrights">
        <p>Copyright {new Date().getFullYear()} - InkTemplate</p>
      </div>
      <style jsx>{`
        // footer {
        //   bottom: 0;
        //   position: absolute;
        //   background-color: white;
        //   width: 100%;
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        //   flex-direction: column;
        //   background-color: #f2eeeb;
        // }

        // footer div {
        //   width: 100%;
        //   display: flex;
        //   justify-content: center;
        //   margin-bottom: 10px;
        // }

        // footer a {
        //   margin: 0 2%;
        // }

        .links,
        .copyrights {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .links a {
          margin: 1%;
        }

        .copyrights p {
          color: white;
          font-weight: bold;
          margin-bottom: 2%;
        }
      `}</style>
    </footer>
  );
};

export default withTranslation("common")(Footer);
