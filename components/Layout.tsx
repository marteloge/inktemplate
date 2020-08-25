import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <div className="container">
    <Navbar />
    {children}
    <Footer />

    <style jsx global>{`
      footer {
        bottom: 0;
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
    `}</style>
  </div>
);

export default Layout;
