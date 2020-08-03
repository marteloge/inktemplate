import { withTranslation, Router } from "../../i18n";

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
  const res = await fetch("http://localhost:8000/draft/" + query.uuid);
  const draft = await res.json();

  return {
    namespacesRequired: ["common", "meta"],
    draft: draft,
  };
};

export default withTranslation("common")(Draft);
