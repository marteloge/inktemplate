import Link from "next/link";

const Navbar = () => (
  <div>
    <Link href="/about">
      <a>About</a>
    </Link>
    <Link href="/products">
      <a>Products</a>
    </Link>
    <Link href="/create">
      <a>Create</a>
    </Link>
  </div>
);

export default Navbar;
