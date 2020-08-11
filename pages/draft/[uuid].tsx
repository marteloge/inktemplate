import { withTranslation, Router } from "../../i18n";
import { fetchDraft } from "../../src/helpers";

type Props = {
  t: any;
  draft: any;
};
const Draft = (props) => {
  console.log(props.draft);
  return (
    <div>
      <h1>Hei product {props.t("generate.header")}</h1>
      <p>{props.draft.id}</p>
      <p>{props.draft.uuid}</p>
    </div>
  );
};

Draft.getInitialProps = async ({ query }) => {
  const draft = await fetchDraft(query.uuid);

  return {
    namespacesRequired: ["common", "meta"],
    draft: draft,
  };
};

export default withTranslation("common")(Draft);
