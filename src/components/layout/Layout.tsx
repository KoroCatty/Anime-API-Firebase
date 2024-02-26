import Header from "./Header";
import Footer from "./Footer";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="app">
      <Header />
      <div className="appContent">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
