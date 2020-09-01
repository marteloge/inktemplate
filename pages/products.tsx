import { useState } from "react";
import Head from "next/head";

import { logEvent, createOrUpdateDraft } from "../helpers/api";
import { newUUID } from "../helpers/global";
import { newDraft } from "../helpers/products";
import { Link, Router, withTranslation } from "../helpers/i18n";
import Layout from "../components/Layout";
import Splash from "../components/Splash";
import Popup from "../components/Popup";

const createNew = (product, setLoading) => {
  setLoading(true);
  const uuid = newUUID();
  const start = new Date();

  createOrUpdateDraft(uuid, newDraft(product, uuid)).then((uuid) => {
    setTimeout(
      () => Router.push(`/create/[uuid]?uuid=${uuid}`, `/create/${uuid}`),
      2500 - (new Date().getTime() - start.getTime())
    );
  });
};

const Products = ({ t }) => {
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);

  if (loading) {
    return <Splash confetti content={t("splash.confetti")}></Splash>;
  }

  if (popup) {
    return (
      <Popup open={popup} setOpen={setPopup}>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ maxWidth: "500px", fontSize: "20px" }}>
            {t("products.popup.sorry")}
          </p>
        </div>
      </Popup>
    );
  }
  return (
    <Layout>
      <Head>
        <title>{t("meta:products.title")}</title>
        <meta name="description" content={t("meta:products.description")} />
        <meta name="robots" content="index" />
      </Head>
      <div className="content">
        <h1>{t("products.header")}</h1>
        <p style={{ maxWidth: "800px" }}>{t("products.intro")}</p>

        <div className="products">
          <div className="product">
            <div>
              <Link
                href="/product/[name]?name=placecard"
                as="/product/placecard"
              >
                <a className="header strike">
                  {t("products.placecard.header")}
                </a>
              </Link>
            </div>
            <div></div>
            <p>{t("products.placecard.description")}</p>
            <div className="link">
              <img src="/static/images/placecard.jpg"></img>
              <button
                onClick={() => {
                  logEvent("products_create_placecard");
                  createNew("PLACECARD", setLoading);
                }}
              >
                {t("products.placecard.create")}
              </button>
            </div>
          </div>

          <div className="product">
            <div>
              <Link href="/product/[name]?name=nametag" as="/product/nametag">
                <a className="header strike">{t("products.nametag.header")}</a>
              </Link>
            </div>
            <p>{t("products.nametag.description")}</p>
            <div className="link">
              <img src="/static/images/nametag.jpg"></img>
              <button
                onClick={() => {
                  logEvent("products_create_nametag");
                  createNew("NAMETAG", setLoading);
                }}
              >
                {t("products.nametag.create")}
              </button>
            </div>
          </div>

          <div className="product">
            <div>
              <Link
                href="/product/[name]?name=invitation"
                as="/product/invitation"
              >
                <a className="header strike">
                  {t("products.invitation.header")}
                </a>
              </Link>
            </div>
            <p>{t("products.invitation.description")}</p>

            <div className="link">
              <img src="/static/images/invitation.jpg"></img>
              <button
                onClick={() => {
                  logEvent("products_create_invitation");
                  setPopup(true);
                }}
              >
                {t("products.invitation.create")}
              </button>
            </div>
          </div>

          <div className="product">
            <div>
              <Link
                href="/product/[name]?name=savethedate"
                as="/product/savethedate"
              >
                <a
                  className="header strike"
                  onClick={() => logEvent("products_create_savethedate")}
                >
                  {t("products.savethedate.header")}
                </a>
              </Link>
            </div>
            <p>{t("products.savethedate.description")}</p>

            <div className="link">
              <img src="/static/images/savethedate.jpg"></img>
              <button
                onClick={() => {
                  logEvent("products_create_savethedate");
                  setPopup(true);
                }}
              >
                {t("products.savethedate.create")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .content {
          margin: 5% 10%;
          display: flex;
          flex-direction: column;
          height: 100%;
          display: relative;
        }

        .products {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin: 20px 0 5% 0;
        }

        .product {
          width: 25%;
          min-width: 400px;
          padding: 2%;
          margin: 0 1% 1% 0;
          background-color: white;
          border-radius: 10px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .header {
          font-size: 30px;
        }

        .link {
          display: flex;
          align-items: center;
        }

        .link button {
          font-size: 18px;
          padding: 20px;
          text-decoration: underline;
          border: 0;
        }

        img {
          max-width: 120px;
          border-radius: 100px;
          margin-top: 20px;
        }

        @media (max-width: 950px) {
          .product {
            min-width: 250px;
            width: 100%;
            padding: 5%;
          }
        }
        @media (max-width: 750px) {
          .product {
            min-width: 250px;
            margin: 0 0 5% 0;
          }
        }
      `}</style>

      <style jsx global>{`
        .container {
          background-color: #f2eeeb;
        }
      `}</style>
    </Layout>
  );
};

Products.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta", "product"],
});

export default withTranslation("common")(Products);
