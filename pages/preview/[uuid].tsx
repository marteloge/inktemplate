import { withTranslation, Link } from "../../i18n";
import Layout from "../../src/components/Layout";
import Head from "next/head";

import dynamic from "next/dynamic";
import { getDraft } from "../../src/api";

const PreviewPDF = dynamic(import("../../src/components/Print/PreviewPDF"), {
  ssr: false,
});

// const Download = dynamic(import("./../src/components/Print/Download"), {
//   ssr: false,
// });

const Preview = (props) => {
  const { t, draft } = props;

  return (
    <Layout>
      <Head>
        <title>{t("meta:generate.title")}</title>
        <meta name="description" content={t("meta:generate.description")} />
      </Head>
      <div className="wallpaper">
        <h2>{t("product:painting")}</h2>
      </div>

      <div className="content">
        <div>
          <PreviewPDF draft={draft}></PreviewPDF>
        </div>
        <div>
          <h1>{t("generate.header")}</h1>
          <Link href={`/checkout/${draft.uuid}`}>
            <a>To checkout</a>
          </Link>
        </div>
      </div>

      <style jsx>{`
        h1 {
          margin: 0;
        }

        p {
          margin: 20px 0;
        }
      `}</style>

      <style jsx global>{`
        .wallpaper {
          width: 100vw;
          height: 100vh;
          position: fixed;
          background-color: rgb(242, 238, 235);
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 1;
        }

        .container {
          background-color: rgb(242, 238, 235);
        }

        .content {
          height: 100%;
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: row;
          margin: 3% 0;
        }

        .content > div {
          width: 50%;
          padding-left: 4%;
        }

        .react-pdf__Page__svg {
          max-width: 50vw;
          height: auto;
          border-radius: 5px;
          background-color: rgb(242, 238, 235) !important;
        }

        svg {
          max-width: 50vw;
          height: auto;
        }
      `}</style>
    </Layout>
  );
};

Preview.getInitialProps = async ({ query }) => {
  const draft = await getDraft(query.uuid);

  return {
    draft: draft,
    namespacesRequired: ["common", "meta", "product"],
  };
};

export default withTranslation("common")(Preview);
