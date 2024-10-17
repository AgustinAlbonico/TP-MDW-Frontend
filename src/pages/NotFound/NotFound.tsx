import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundElement from "../../components/NotFoundElement";

interface RoutesWithNotFoundProps {
  children: JSX.Element[] | JSX.Element;
}

const NotFound: FC<RoutesWithNotFoundProps> = ({ children }) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<NotFoundElement />} />
    </Routes>
  );
};

export default NotFound;
