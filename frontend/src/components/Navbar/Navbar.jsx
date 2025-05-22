import { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { AuthContext } from "../../context/AuthContext";

import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { FaBars } from "react-icons/fa";


export default function Navbar() {
  const { user,logout } = useContext(AuthContext);
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
        <h2
        className="nav-h2">Gestão de Processo</h2>
   

        <ul className={`nav-links ${menuAberto ? "nav-active" : ""}`}>

   
          <li className="dropdown">
            <Link to="area" className="link">
              Área
            </Link>
            <FiChevronDown
              onClick={() => setDropdown(dropdown === "areas" ? null : "areas")}
              size={26}
              cursor={"pointer"}
              color="#4F372F"
            />
           
           <ul className={`dropdown-content ${dropdown === 'areas' ? 'open' : ''}`}>
                <li>
                  <Link to="/cadastrar/area" className="link">
                    Cadastro
                  </Link>
                </li>
              </ul>
           
          </li>

          <li className="dropdown">
            <Link to="/" className="link">
              Processo
            </Link>
            <FiChevronDown
              onClick={() =>
                setDropdown(dropdown === "processos" ? null : "processos")
              }
              size={26}
              cursor={"pointer"}
              color="#4F372F"
            />
           
              <ul
                className={`dropdown-content ${
                  dropdown === "processos" ? "open" : ""
                }`}
              >
                <li>
                  <Link to="/cadastrar/processo" className="link">
                    Cadastro
                  </Link>
                </li>
              </ul>
          
          </li>

          <li className="dropdown">
            <Link to="subprocesso" className="link">
              Subprocesso
            </Link>

            <FiChevronDown
             onClick={() => setDropdown(dropdown === 'subprocessos' ? null : 'subprocessos')}
              size={26}
              cursor={"pointer"}
              color="#4F372F"
            />
        
               <ul className={`dropdown-content ${dropdown === 'subprocessos' ? 'open' : ''}`}>
                <li>
                  <Link to="/cadastrar/subprocesso" className="link">
                    Cadastro
                  </Link>
                </li>
              </ul>
         
          </li>
          
        </ul>
    {/* botao responsivo */}
   


    
    <FaBars size={20} style={{ color: "black"}}
        className="menu-btn" onClick={() => setMenuAberto(!menuAberto)} />
<div>
<strong>{user?.nome}</strong>
  <button className="logout" style={{ width: "80px" }} onClick={logout}>
  Sair
</button>
</div>


      
      </nav>
     </header>
  );
}
