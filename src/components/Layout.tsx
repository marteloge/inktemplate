import Navbar from "./Navbar";

const Layout = ({ children }) => (
  <div className="container">
    <Navbar />

    {children}

    <style jsx>{``}</style>
  </div>
);

export default Layout;
