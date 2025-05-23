import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar/Navbar';


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