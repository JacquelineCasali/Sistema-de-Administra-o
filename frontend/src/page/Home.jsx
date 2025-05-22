import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar/Navbar';
import VisualizarPDF from '../components/PdfViewerServer/VisualizarPDF';


export default function Home() {

  return (
    <>
    <Navbar />
     <section className="main">
     
     <Outlet/>
     </section>
  
    </>
  )
}