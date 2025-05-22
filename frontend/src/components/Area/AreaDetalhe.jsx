import React, { useState } from 'react'
import api from '../../services/api';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Modal from "../Modal/Modal";
import "./Area.css"
import { useNavigate } from 'react-router-dom';
export default function AreaDetalhe({area}) {
    const { nome,id } = area;
      const [openModal, setOpenModal] = useState(false);

      const navigate = useNavigate();
      function ClickEdit(id) {
        navigate("/cadastrar/area/" + id,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
      }
    const handleDelete = (id) => {
      api.delete(`/area/` + id,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
        .then(() => {
        window.location.reload();
         setOpenModal(false)
        })
        .catch((err) => console.log(err));
    };
    
  
    return (
    <>
    <section className='area'>
     <option value={id}>
              {nome}
            </option>
            <div className="iconetable">
                  <FaRegEdit
                    className="me-3"
                    onClick={() => ClickEdit(id)}
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
    </section>
 
    </>
  )
}
