

import AreaDetalhe from "../../components/Area/AreaDetalhe";

import { useContext } from "react";
import { CardContext } from "../../context/CardContext";
import Loading from "../../components/Loading/Loading";
import { Head } from "../../components/Head/Head";
import Title from "../../components/Title/Tlite";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import Search from "../../components/Search/Search";





export default function AreaPage() {
  const {areaFilter,busca,setBusca} = useContext(CardContext);


  return(
    <>
<Head title="Lista de Àrea"/>

<section className="section">
    <Title text="Áreas" theme="h1"/>

   <div className="cabecalho">
   <Link 
        className="btn-cadastro" 
        to={`/cadastrar/area`}>
                <IoMdAdd
              size={25}
             cursor="pointer"
        />
        Cadastro
                </Link>
                <Search busca={busca} setBusca={setBusca}/> 
   </div>
  
    </section>

    {areaFilter.length === 0 ? (
        <Loading />
      ) : (
 areaFilter.map((area) => (
            <AreaDetalhe key={area.id} area={area} />
          ) ))}

    </>
    
  )
}
 
  
  

