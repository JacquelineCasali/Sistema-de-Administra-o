import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import FormularioSubprocesso from '../../components/Subprocesso/FormularioSubprocesso'

export default function Subprocesso({onLogout}) {
  return (
    <>
           <Navbar onClick={onLogout}/>
           <FormularioSubprocesso/>
    </>
  
  )
}
