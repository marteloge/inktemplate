import { useRouter } from "next/router";
import { useOrder } from "./../src/hooks";

const Receipt = () => {
  const router = useRouter();
  const { order, isLoading } = useOrder(router.query.session_id);

  return (
    <div>
      <h2>Takk for betalingen!</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>Vi sender print på mail til {order.customer.email}</p>
      )}
    </div>
  );
};

export default Receipt;
