import React, { useContext, useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import Subrocesso from "../Subprocesso/SubProcesso";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Modal from "../Modal/Modal";
import api from "../../services/api";
import { CardContext } from "../../context/CardContext";
import { useNavigate } from "react-router-dom";

export default function ProcessoDetalhe({ processo, clickEdit }) {
  const { nome, descricao, id, responsavel, ferramentas, documentacao, Area } =
    processo;
   

  const [selectedProcesso, setSelectedProcesso] = useState(null);
  const [isSeta, setIsSeta] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { subprocesso } = useContext(CardContext);
  const navigate = useNavigate();
  const handleSelectProcesso = (processoId) => {
    setSelectedProcesso(processoId === selectedProcesso ? null : processoId);
  };

  const handleDelete = (id) => {
    api
      .delete(`/processo/` + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        window.location.reload();
        setOpenModal(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    
    
 <div className="processo-card">
 <div className="detalhes">
  <h2>{nome}</h2>
  <div className="processo-detalhe">
   <strong>Área:</strong> <p>{Area ? Area.nome : "Sem área definida"}
     </p>
</div>
  </div>
         <div className="detalhes">
     <div className="processo-detalhe">
       <strong>Descrição do Processo:</strong>
       <p>{descricao}</p>
     </div>
     <div className="processo-detalhe">
       <strong>Responsável:</strong>
       <p> {responsavel}</p>
     </div>
   </div>
   <div className="detalhes-inferior">
     <div className="processo-detalhe">
       <strong>Ferramentas:</strong>
       <p> {ferramentas}</p>
     </div>
     <div className="processo-detalhe">
       <strong>Documentação:</strong>
       {processo.documentacao && (
       <p onClick={() => navigate(`/processo/${processo.id}/pdf`)}
      
       className="documentacao"
       > {documentacao}</p>
       
       )}  
     </div>
   </div>
   <div
     className="menu-sections"
     onClick={() => handleSelectProcesso(processo.id)}
   >
     <p>Subprocessos</p>
     {isSeta ? (
       <FiChevronUp
         onClick={() => setIsSeta(false)}
         size={26}
         cursor={"pointer"}
         color="#4F372F"
       />
     ) : (
       <FiChevronDown
         onClick={() => setIsSeta(true)}
         size={26}
         cursor={"pointer"}
         color="#4F372F"
       />
     )}
   </div>
   {isSeta && (
     <>
       {selectedProcesso === processo.id && (
         <div>
           <Subrocesso
             processoId={processo.id}
             subprocesso={subprocesso}
           />
         </div>
       )}
     </>
   )}
   <div className="iconetable">
     <FaRegEdit
       className="me-3"
       onClick={() => clickEdit(id)}
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
           Tem certeza que deseja deletar esse Processo?
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
    
     
    
  );
}
