import Link from "next/link";

export default function Products() {
  return (
    <div>
      <h1>Products</h1>
      <Link href="/product/[name]" as="/product/invitation">
        <a>Invitation</a>
      </Link>
      <Link href="/product/[name]" as="/product/placecard">
        <a>Place Card</a>
      </Link>
    </div>
  );
}
