import Navbar from "./Navbar";

const Layout = ({ children }) => (
  <div className="container">
    <Navbar />

    {children}

    <style jsx>{`
      .container {
        position: fixed;
        height: 100%;
        width: 100%;
      }
    `}</style>
  </div>
);

export default Layout;
