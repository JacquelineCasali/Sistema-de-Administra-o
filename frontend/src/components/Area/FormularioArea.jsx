import React, { useEffect, useState } from "react";
import Title from "../Title/Tlite";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button/Button";
import "../../Styles/Formulario.css"

export default function FormularioArea() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [values, setValues] = useState({
    nome: "",
  });
  useEffect(() => {
    //  banco de dados

    try {
      api
        .get(`/area/` + id, {
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

      const response =
        id > 0
          ? await api.put(`/area/` + id, values, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
          : await api.post("/area", values, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });

      if (response.data) {
        navigate("/");

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
        <Title>{id > 0 ? "Editar Área" : "Cadastrar Área"}</Title>

        <form onSubmit={SaveEdit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control  text-secondary"
              placeholder="Nome da nova área"
              value={values.nome}
              onChange={(e) => setValues({ ...values, nome: e.target.value })}
              required
            />
          </div>
          <Button text={id ? "Editar" : "Cadastrar"} theme={"roxo"} />
        </form>
      </div>
    </section>
  );
}
