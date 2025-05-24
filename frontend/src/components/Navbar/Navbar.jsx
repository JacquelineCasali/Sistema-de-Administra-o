import { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { AuthContext } from "../../context/AuthContext";

import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { FaBars } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuAberto, setMenuAberto] = useState(false);
  const [dropdown, setDropdown] = useState(null); // Controla dropdowns abertos

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const fecharDropdown = (e) => {
      if (!e.target.closest(".dropdown")) setDropdown(null);
    };
    document.addEventListener("click", fecharDropdown);
    return () => document.removeEventListener("click", fecharDropdown);
  }, []);

  return (
    <header className="header">
      <nav className="nav-bar">
        <h2 className="nav-h2"> Sistema Administrativo</h2>

        <ul className={`nav-links ${menuAberto ? "nav-active" : ""}`}>
          {/* Menu geral  */}
          {/* <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li> */}

          <li>
            <Link to="/extract" className="link">
              Extrato
            </Link>
          </li>

          <li>
            <Link to="/" className="link">
              Carteira
            </Link>
          </li>

          <li className="dropdown">
            <span className="link" style={{ color: "rgb(13, 110, 253)" }}>
              Usuários
            </span>
            <FiChevronDown
              onClick={() =>
                setDropdown(dropdown === "usuarios" ? null : "usuarios")
              }
              size={26}
              cursor={"pointer"}
              color="#4F372F"
            />
            <ul
              className={`dropdown-content ${
                dropdown === "usuarios" ? "open" : ""
              }`}
            >
              <li>
                <Link to={`edit/${user?.id}/`} className="link">
                  Editar
                </Link>
              </li>

              <li>
                <Link to="/relatorio" className="link">
                  Relatório
                </Link>
              </li>
            </ul>
          </li>

          {user?.role === "admin" && (
            <li className="dropdown">
              <span className="link" style={{ color: "rgb(13, 110, 253)" }}>
                Usuários
              </span>
              <FiChevronDown
                onClick={() =>
                  setDropdown(dropdown === "usuarios" ? null : "usuarios")
                }
                size={26}
                cursor={"pointer"}
                color="#4F372F"
              />
              <ul
                className={`dropdown-content ${
                  dropdown === "usuarios" ? "open" : ""
                }`}
              >
                <li>
                  <Link to="/cadastro" className="link">
                    Cadastrar
                  </Link>
                </li>
                <li>
                  <Link to={`edit/${user?.id}/`} className="link">
                    Editar
                  </Link>
                </li>

                <li>
                  <Link to="/relatorio" className="link">
                    Relatório
                  </Link>
                </li>
              </ul>
            </li>
          )}
        </ul>

        <FaBars
          size={20}
          style={{ color: "black" }}
          className="menu-btn"
          onClick={() => setMenuAberto(!menuAberto)}
        />
        <div>
          <strong>{user?.name}</strong>

          <strong style={{ marginLeft: "10px" }}>{user?.role}</strong>
          <button className="logout" style={{ width: "80px" }} onClick={logout}>
            Sair
          </button>
        </div>
        
      </nav>
    </header>
  );
}
