import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "./Footer";
import SearchBar from "./SearchBar";
import { useAuth } from "../contexts/AuthContext";
import { notifySuccess } from "../utils/toastFunctions";

const Navbar = ({
  children,
  searchNote,
  handleClearSearch,
}: {
  children: ReactNode;
  searchNote?: (query: string) => Promise<void>;
  handleClearSearch?: () => void;
}) => {
  const { user,logout } = useAuth();
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState("");

  //Manejador para buscar una nota
  const handleSearch = async () => {
    if (searchQuery && searchNote) {
      await searchNote(searchQuery);
    }
  };

  //Manejador para limpiar la busqueda
  const onClearSearch = () => {
    if (handleClearSearch) {
      setSearchQuery("");
      handleClearSearch();
    }
  };

  //Manejador para cerrar sesion
  const handleLogout = () => {
    localStorage.removeItem("token")
    logout()
    navigate("/login")
    notifySuccess("Sesión cerrada correctamente")
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      <nav className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className="text-xl font-medium text-black py-2">Notas</h2>

        {user && (
          <SearchBar
            value={searchQuery}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        )}

        {user && <button onClick={handleLogout}>Cerrar sesión</button>}
      </nav>

      {children}

      <Footer />
    </div>
  );
};

export default Navbar;
