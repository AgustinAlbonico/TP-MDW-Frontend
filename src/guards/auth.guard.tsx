import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../models/routes.model";

const AuthGuard = () => {
  let userLogged: boolean = true;

  //Logica para verificar si esta logueado

  return userLogged ? <Outlet /> : <Navigate replace to={PublicRoutes.LOGIN} />;
};

export default AuthGuard