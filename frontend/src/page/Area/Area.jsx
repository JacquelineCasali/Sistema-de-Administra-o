import React from 'react'

import FormularioArea from '../../components/Area/FormularioArea'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
export default function Area({onLogout}) {

    return (
    <>
           <Navbar onClick={onLogout}/>
     
         <Link to="/"
         style={{display:"flex",justifyContent:"flex-end", margin:" 20px 40px 20px 0"}}>Voltar</Link>
         <FormularioArea/>
       
     

    </>
  )
}
