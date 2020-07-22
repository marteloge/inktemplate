import Head from "next/head";
import Navbar from "./Navbar";

const Layout = (props) => (
  <div>
    <Head>
      <title>InkTemplate</title>
      <meta
        name="description"
        content="Create free printable templates for your invitation, place cards and menus."
      />
    </Head>
    <Navbar />
    {props.children}
  </div>
);

export default Layout;
