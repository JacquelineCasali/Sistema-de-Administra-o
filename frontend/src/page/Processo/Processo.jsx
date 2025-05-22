import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import FormularioProcesso from '../../components/Processo/FormularioProcesso'

export default function Processo({onLogout}) {
  return (
    <>
  
           <Navbar onClick={onLogout}/>
           <FormularioProcesso/>
    </>
  
  )
}
