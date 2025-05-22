import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { MdOutlineEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import "../components/Login/login.css";
import api from "../services/api";
import Title from "../components/Title/Tlite";
import { Head } from "../components/Head/Head";
import { toast } from "react-toastify";
import Button from "../components/Button/Button";

const CadastroUsuario = () => {
  const [isShow, setIsShow] = useState(false);
  const [isCon, setIsCon] = useState(false);


  // const navigate = useNavigate();
  const navigate = useNavigate();
  const { id } = useParams();

  const [values, setValues] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    //  banco de dados

    try {
      api.get(`/user/` + id,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
        
      ).then((res) => {
        setValues(res.data);
        toast.error(res.data.message);
      });
    } catch (err) {
      console.error(err);
      alert("Erro tente Novemante! Banco não conectado");
    }
  }, []);

  async function SaveEdit(e) {
    try {
      // intercepitação do evento
      e.preventDefault();

      if (values.password !== values.confirmPassword) {
        toast.error("Senha e Confirme a senha devem ser iguais");
        return false;
      }

      const response =
        id > 0
          ? await api.put(`/user/` + id, values,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          : await api.post("/user", values);

      if (response.data) {
        id> 0 ? navigate("/processo"):
        navigate("/")
        toast.success(response.data.message)
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  }

  return (
    <section className="body">
      <Head title={"Cadastro Usuário"} />
      <form onSubmit={SaveEdit} className="form">
        <div className="formulario-login">
          <Title>{id > 0 ? "Editar usuário" : "Cadastrar usuário"}</Title>

          <div className="input-senha">
            <input
              className="form-control  text-secondary"
              type="text"
           required
              placeholder="Nome"
              autoComplete="nome"
              value={values.nome}
              onChange={(e) => setValues({ ...values, nome: e.target.value })}
            />
            <FaUser className="icon text-secondary" />
          </div>
          <div className="input-senha">
            <input
              className="form-control text-secondary"
              type="email"
              placeholder="Digite o Email"
              id="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            <MdOutlineEmail size={20} className="icon text-secondary" />
          </div>
          <div className="input-senha">
            <input
              className="form-control text-secondary"
              type={isShow ? "text" : "password"}
              placeholder="Crie sua senha"
              minLength={3}
       required
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
            {/* visualizar senha */}
            {isShow ? (
              <MdVisibilityOff
                size={20}
                className="icon text-secondary"
                onClick={() => setIsShow(!isShow)}
                cursor={"pointer"}
              />
            ) : (
              <MdVisibility
                size={20}
                className="icon text-secondary "
                onClick={() => setIsShow(!isShow)}
                cursor={"pointer"}
              />
            )}
          </div>

          <div className="input-senha">
            <input
              className="form-control text-secondary"
              type={isCon ? "text" : "password"}
              placeholder="Confirme sua senha"
         
              onChange={(e) =>
                setValues({ ...values, confirmPassword: e.target.value })
              }
         
            />

            {isCon ? (
              <MdVisibilityOff
                size={20}
                className="icon text-secondary"
                onClick={() => setIsCon(!isCon)}
                cursor={"pointer"}
              />
            ) : (
              <MdVisibility
                size={20}
                className="icon text-secondary "
                onClick={() => setIsCon(!isCon)}
                cursor={"pointer"}
              />
            )}
          </div>

          <Button text=  {id ? "Editar" : "Cadastrar"} 

theme={"roxo"}
type="submit"

         
        />
          

        

      


{id ? "" :  <Link className="text-esqueceu" to="/">
            Faça Login aqui
          </Link>}
         
        </div>
      </form>
    </section>
  );
};

export default CadastroUsuario;