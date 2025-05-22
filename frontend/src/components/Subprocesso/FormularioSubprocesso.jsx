import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../Styles/Formulario.css";
import { toast } from "react-toastify";
import api from "../../services/api";
import Title from "../Title/Tlite";
import Button from "../Button/Button";
import { CardContext } from "../../context/CardContext";


const FormularioSubprocesso = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {dados} = useContext(CardContext);

 const [values, setValues] = useState({
    nome: "",
    descricao: "",
    processoId: "",
  });
  useEffect(() => {
    //  banco de dados

    try {
      api
        .get(`/subprocesso/` + id, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setValues(res.data);
        });
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
      // alert("Erro tente Novemante! Banco não conectado");
    }
  }, []);

  async function SaveEdit(e) {
    try {
      // intercepitação do evento
      e.preventDefault();

      if (!values.processoId) {
        toast.error("selecione um processo");
        return;
      }
      const response =
        id > 0
          ? await api.put(`/subprocesso/` + id, values, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
          : await api.post("/subprocesso", values, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });

      if (response.data) {
        navigate("/");
        window.location.reload();
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
      // alert("Usuario já cadastrada");
    }
  }

  return (
 
      <section className="body">
        <div className="form-container">
          <Title>{id > 0 ? "Editar Subprocesso" : "Cadastrar Subprocesso"}</Title>

          <form onSubmit={SaveEdit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control  text-secondary"
                placeholder="Nome do Subprocesso"
                value={values.nome}
                onChange={(e) => setValues({ ...values, nome: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Descrição:</label>
              <textarea
                value={values.descricao}
                onChange={(e) =>
                  setValues({ ...values, descricao: e.target.value })
                }
                placeholder="Descreva a descrição do subprocesso"
                required
              />
            </div>
            <div className="form-group">
              <label>Processo:</label>
              <select
                value={values.processoId}
                onChange={(e) =>
                  setValues({ ...values, processoId: e.target.value })
                }
              >
                <option value="">Selecione um processo</option>
                {dados.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>
   <Button text={id ? "Editar" : "Cadastrar"} theme={"roxo"}
   type="submit" />
                </form>
        </div>
      </section>
  
  );
};

export default FormularioSubprocesso;
