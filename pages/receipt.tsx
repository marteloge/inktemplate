import { useRouter } from "next/router";
import { useOrder } from "./../src/hooks";

const Receipt = () => {
  const router = useRouter();
  const { data, isLoading } = useOrder(router.query.session_id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { draft, order } = data;

  return (
    <div>
      <h2>Takk for betalingen!</h2>
      <p>Vi har sendt print på mail til {order.customer.email}</p>
    </div>
  );
};

export default Receipt;
