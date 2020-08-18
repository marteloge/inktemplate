import Layout from "../../src/components/Layout";
import { getDraft } from "../../src/api";
import { withTranslation } from "../../i18n";
import dynamic from "next/dynamic";

const DownloadLink = dynamic(
  import("./../../src/components/print/DownloadLink"),
  {
    ssr: false,
  }
);

const Download = (props) => {
  const { t, draft } = props;
  return (
    <Layout>
      <div>
        <h1>{t("language")} - Download</h1>
        <DownloadLink {...draft}></DownloadLink>
      </div>

      <style jsx>{``}</style>
    </Layout>
  );
};

Download.getInitialProps = async ({ query }) => {
  const draft = await getDraft(query.uuid);

  return {
    draft: draft,
    namespacesRequired: ["common", "meta", "product"],
  };
};

export default withTranslation("common")(Download);