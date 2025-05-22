import React, { useState } from "react";
import api from "../../services/api";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Modal from "../Modal/Modal";
import { Link, useNavigate } from "react-router-dom";

const SubrocessoDetalhe = ({ subprocesso }) => {
  const { nome, descricao, id } = subprocesso;
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    api
      .get("/subprocesso/" + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/cadastrar/subprocesso/${id}`);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    api
      .delete(`/subprocesso/` + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        window.location.reload();
        setOpenModal(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="subprocesso-card">
        <h2>{nome}</h2>
        <div className="processo-detalhe">
          <strong>Descrição do SubProcesso:</strong>
          <p>{descricao}</p>
        </div>
       
        <div className="iconetable">
          <FaRegEdit
            className="me-3"
            onClick={() => handleEdit(id)}
            size={20}
            color={"blue"}
            cursor={"pointer"}
          />
          <FaRegTrashAlt
            onClick={() => setOpenModal(true)}
            size={20}
            color={"red"}
            cursor={"pointer"}
          />

          <Modal isOpen={openModal} isClose={() => setOpenModal(false)}>
            <div>
              <h2>Olá</h2>
              <p>{nome}</p>
              <span className="span">
                Tem certeza que deseja deletar esse SubProcesso?
              </span>
              <div>
                <button
                  onClick={() => setOpenModal(false)}
                  className="btn btn-primary me-2 mt-3"
                >
                  Cancelar
                </button>

                <button
                  onClick={() => handleDelete(id)}
                  className="btn btn-danger mt-3 ml-3"
                >
                  <FaRegTrashAlt
                    color="white"
                    size={20}
                    cursor="pointer"

                    //className="icone"
                  />
                  Deletar
                </button>
              </div>
            </div>
          </Modal>
        </div>
        
      </div>
      <Link to="/cadastrar/subprocesso">
            {" "}
            Cadastre aqui um subprocesso{" "}
          </Link>
    </>
  );
};

export default SubrocessoDetalhe;
