
import AppRoutes from "./Routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function App() {
 

  return (
  <>
  
    <AppRoutes />
       <ToastContainer 
       toastStyle={{  backgroundColor: "black" ,color:"white"}}
       position="top-center"
       autoClose={2000}

      />
  </>
)

}

export default App
