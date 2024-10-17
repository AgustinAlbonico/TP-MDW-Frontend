import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { PrivateRoutes } from "../models/routes.model";
import Footer from "./Footer";

const Navbar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex flex-col justify-between">
      <nav className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className="text-xl font-medium text-black py-2">Notas</h2>
        <Link to={`/${PrivateRoutes.PROFILE}`}>Mi cuenta</Link>
      </nav>
      {children}
      <Footer/>
    </div>
  );
};

export default Navbar;
