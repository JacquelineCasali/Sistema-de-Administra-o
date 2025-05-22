import { useContext, useState } from "react";
import { MdOutlineEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import Title from "../Title/Tlite";
import "./login.css";

import { AuthContext } from "../../context/AuthContext";

import Button from "../Button/Button";
import { Head } from "../Head/Head";

import { toast } from "react-toastify";
export default function Login() {
  //mostrar a senha
  const [isShow, setIsShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      e.preventDefault();
      await login(email, password);
   navigate("/")
   
  } catch (err) {
    toast.error(err.response.data.message)
      console.error("Login error:", err);
    }
  };
  return (
    <>
    <Head title={"Login"}/>
      <section className="body">
        <form onSubmit={handleLogin} className="form">
          <div className="formulario-login">
            <Title>Login</Title>

            <div className="input-senha">
              <input
                className="form-control  text-secondary"
                type="email"
                placeholder="Digite o Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <MdOutlineEmail className="icon text-secondary" />
            </div>
            <div className="input-senha">
              <input
                className="form-control text-secondary"
                type={isShow ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* visualizar senha */}
              {isShow ? (
                <MdVisibilityOff
                  className="icon text-secondary "
                  onClick={() => setIsShow(!isShow)}
                  cursor={"pointer"}
                  size={20}
                />
              ) : (
                <MdVisibility
                  size={20}
                  cursor={"pointer"}
                  className="icon text-secondary "
                  onClick={() => setIsShow(!isShow)}
                />
              )}
            </div>

            <Link className="text-esqueceu" to={"/senha"}>
              Esqueceu sua senha?
            </Link>

        

         <Button text={"Login"}
      type="submit"
         theme={"roxo"}
          
         />

            <Link className="text-esqueceu" to="/cadastro">
              Crie Sua Conta
            </Link>
          </div>
        </form>
      </section>
    

    </>
  );
}
