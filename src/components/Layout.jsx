import { Outlet } from "react-router-dom";
import { Header } from "./HeaderComp/Header";
import { Footer } from "./FooterComp/Footer";

export const Layout = () => {
  return (
    <>
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};