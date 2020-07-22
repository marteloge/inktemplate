import { useRouter } from "next/router";

export default function Product() {
  const router = useRouter();
  const { name } = router.query;

  return (
    <div>
      <h1>Product - {name}</h1>
    </div>
  );
}
