import React, { useState, useEffect } from "react";

import api from "../../services/api";
import { toast } from "react-toastify";
import SubrocessoDetalhe from "./SubrocessoDetalhe";
import Title from "../Title/Tlite";
import { Link } from "react-router-dom";

const Subrocesso = ({ processoId }) => {
  const [subprocessos, setSubprocessos] = useState([]);

  useEffect(() => {
    //  banco de dados
    const fetchSubprocessos = async () => {
      try {
        api
          .get(`/subprocesso?processoId=${processoId} `, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setSubprocessos(res.data);
          });
      } catch (err) {
        console.error(err);
        toast.error(err.response.data.message);
      }
    };
    fetchSubprocessos();
  }, [processoId]);

  return (
    <div className="subprocesso-list">
      {subprocessos.length === 0 ? (
        ""
      ) : (
        <Title text="Subprocesso" theme={"h1"} />
      )}

      {subprocessos.length === 0 ? (
        <p className="subprocesso">
          Este processo não possui subprocessos.
          <br />
          <Link to="/cadastrar/subprocesso">
            {" "}
            Cadastre aqui um subprocesso{" "}
          </Link>
        </p>
      ) : (
        subprocessos.map((subprocesso) => (
          <SubrocessoDetalhe key={subprocesso.id} subprocesso={subprocesso}
          />
        ))
      )}
    </div>
  );
};

export default Subrocesso;
