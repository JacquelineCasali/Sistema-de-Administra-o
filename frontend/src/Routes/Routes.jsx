import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../page/LoginPage";
import PrivateRoute from "./PrivateRoute";

import AuthProvider from "../context/AuthContext";
import CadastroUsuario from "../page/CadastroUsuario";
import Home from "../page/Home";
import EditarSenha from "../components/User/EditarSenha";

const AppRoutes = () => {


  return (
    <AuthProvider>
    
        <Router>
          <>

        
          <Routes>
            <Route path="/login" element={<LoginPage />} />
                   <Route exact path="/senha" element={
            
 <EditarSenha/>
    
           } />
            <Route  path="/cadastro" element={<CadastroUsuario />} />
            <Route
              
              path="/edit/:id"
              element={
                <PrivateRoute>
                  <CadastroUsuario />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            >
                  
              {/* <Route
                path="area"
                element={
                  <PrivateRoute>
                    <AreaPage />
                  </PrivateRoute>
                }
              /> */}
            </Route>

          </Routes>
          </>
        </Router>
    
    </AuthProvider>
  );
};
export default AppRoutes;
