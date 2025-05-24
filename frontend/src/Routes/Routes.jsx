import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../page/LoginPage";
import PrivateRoute from "./PrivateRoute";

import AuthProvider from "../context/AuthContext";
import CadastroUsuario from "../page/CadastroUsuario";
import Home from "../page/Home";
import EditarSenha from "../components/User/EditarSenha";
import AdminRoute from "./AdminRoute";
import Extrato from "../page/User/Extrato";

import Relatorio from "../page/Admin/Relatorio";
import WalletPage from "../page/User/WalletPage";

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
                  <Route
                path="/"
                element={
                  <PrivateRoute>
                    <WalletPage   />
                  </PrivateRoute>
                }
              />
              <Route
                path="/extract"
                element={
                  <PrivateRoute>
                    <Extrato  />
                  </PrivateRoute>
                }
              />
           
            </Route>


       <Route
              exact
              path="/admin"
              element={
                <AdminRoute>
                  <Home />
                </AdminRoute>
              }
            >
         
              <Route
                path="/admin/"
                element={
                  <AdminRoute>
                    <Relatorio  />
                  </AdminRoute>
                }
              />
           
                    {/* apenas admin pode cadastrar */}
<Route
  path="cadastro"
  element={
    <AdminRoute>
      <CadastroUsuario />
    </AdminRoute>
  }
/>  

<Route
  path="edit/:id"
  element={
    <AdminRoute>
      <CadastroUsuario />
    </AdminRoute>
  }
/> 
            </Route>

          </Routes>
          </>
        </Router>
    
    </AuthProvider>
  );
};
export default AppRoutes;
