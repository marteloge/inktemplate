import { withTranslation } from "../../i18n";

const Change = () => {
  return (
    <div>
      <h1>Change</h1>
    </div>
  );
};

Change.getInitialProps = ({ query }) => {
  return {
    namespacesRequired: ["common"],
  };
};

export default withTranslation("common")(Change);
