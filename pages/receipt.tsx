import { useRouter } from "next/router";
import { useOrder } from "../helpers/hooks";
import { withTranslation } from "../helpers/i18n";

const Receipt = (props) => {
  const router = useRouter();
  const { data, isLoading } = useOrder(router.query.session_id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { draft, order } = data;

  return (
    <div>
      <h2>{props.t("language")} - Takk for betalingen!</h2>
      <p>Vi har sendt print på mail til {order.customer.email}</p>
    </div>
  );
};

Receipt.getInitialProps = ({ query }) => {
  return {
    namespacesRequired: ["common"],
  };
};

export default withTranslation("common")(Receipt);
