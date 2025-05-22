

import Processo from "../../components/Processo/Processo";
import Title from "../../components/Title/Tlite";
import { useContext } from "react";
import { CardContext } from "../../context/CardContext";
import Search from "../../components/Search/Search"
import { NavLink } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";


export default function ProcessoPage() {

    const {busca,setBusca}=useContext(CardContext)


  return(
    <>


    <section className="section">
    <Title text="Processos" theme="h1"/>

   <div className="cabecalho">
   <NavLink to="/cadastrar/processo"
        className="btn-cadastro" 
        >
                <IoMdAdd
              size={25}
             cursor="pointer"
        />
        Cadastro
                </NavLink>
                <Search busca={busca} setBusca={setBusca}/> 
   </div>
  
    </section>
        
   
    <Processo/>

    </>
    
  )
 
  
  
}
