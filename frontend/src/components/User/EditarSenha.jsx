import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { createSenha } from "../../services/api";

import "../Login/login.css";

import { FaUser } from "react-icons/fa";
import { MdOutlineEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Head } from "../../components/Head/Head";
import Title from "../Title/Tlite";
import Button from "../Button/Button";

const EditarSenha = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const [isShow, setIsShow] = useState(false);
  const [isCon, setIsCon] = useState(false);



  const handleEditarSenha = async (e) => {
    try {
      //não recarrega a pagina
      e.preventDefault();

      const teste = await createSenha(email, password);
      navigate("/");
      console.log(teste);
    } catch (err) {
      toast.error(err.response.data.message);
      console.error("Senha error:", err);
    }
  };
  return (
    <>
      <Head title="Recuperar Senha" />

      <section className="body">
        <form onSubmit={handleEditarSenha} className="form">
          <div className="formulario-login">
            <Title text="Redefinir Senha" theme="h1" />
            <div className="input-senha">
              <input
                value={email}
                className="form-control  text-secondary"
                type="email"
                placeholder="Digite o Email"
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
                placeholder="Digite a Senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />

        
                {/* visualizar senha */}
                {isShow ? (
                  <MdVisibilityOff size={20} 
                     className="icon text-secondary "
                  onClick={() => setIsShow(!isShow)}
                  cursor={"pointer"}
                  />
                ) : (
                  <MdVisibility size={20}
                      cursor={"pointer"}
                  className="icon text-secondary "
                  onClick={() => setIsShow(!isShow)} />
                )}
           
            </div>
            <div className="input-senha">
              <input
                className="form-control"
                type={isCon ? "text" : "password"}
                placeholder="Confirme a senha"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
       
                {/* visualizar senha */}
                {isCon ? (
                  <MdVisibilityOff size={20}
                      className="icon text-secondary "
                  onClick={() => setIsCon(!isCon)}
                  cursor={"pointer"}
                  />
                ) : (
                  <MdVisibility size={20} 
                            className="icon text-secondary "
                  onClick={() => setIsCon(!isCon)}
                  cursor={"pointer"}
                  />
                )}
            
            </div>

     <Button text={"Salvar"}
      type="submit"
         theme={"roxo"}
          
         />

                <Link className="text-esqueceu" to="/">
          Faça Login aqui
        </Link>
          </div>
        </form>

    
      </section>
    </>
  );
};

export default EditarSenha;
