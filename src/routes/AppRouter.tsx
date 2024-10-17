import { BrowserRouter, Route } from "react-router-dom";
import { lazy } from "react";
import { PrivateRoutes, PublicRoutes } from "../models/routes.model";
import AuthGuard from "../guards/auth.guard";
import NotFound from "../pages/NotFound/NotFound";

const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <NotFound>
        <Route path={PublicRoutes.LOGIN} element={<Login />} />
        <Route path={PublicRoutes.REGISTER} element={<Register />} />
        <Route element={<AuthGuard />}>
          <Route path={PrivateRoutes.HOME} element={<Home />} />
        </Route>
      </NotFound>
    </BrowserRouter>
  );
};

export default AppRouter;
