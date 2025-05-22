import React, { useContext } from 'react'
import SubrocessoDetalhe from '../../components/Subprocesso/SubrocessoDetalhe'

import { Head } from '../../components/Head/Head';
import Title from '../../components/Title/Tlite';
import { CardContext } from '../../context/CardContext';
import { IoMdAdd } from 'react-icons/io';
import Search from '../../components/Search/Search';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';


export default function SubprocessoPage() {
 const {sub,busca,setBusca} = useContext(CardContext);

  return (
<>
<Head title="Lista de SubProcesso"/>

<section className="section">
    <Title text="Subprocessos" theme="h1"/>

   <div className="cabecalho">
   <Link className="btn-cadastro" 
   to="/cadastrar/subprocesso"
        >
                <IoMdAdd
              size={25}
             cursor="pointer"
        />
        Cadastro
                </Link>
                <Search busca={busca} setBusca={setBusca}/> 
   </div>
  
    </section>

    {sub.length === 0 ? (
        <Loading />
      ) : (
sub.map((subprocesso) => (
      <SubrocessoDetalhe 
      key={subprocesso.id}
      subprocesso={subprocesso}
      />

   
 ) ))}
 </>

  )
}
