import { useState } from "react";

import { useEffect } from "react";
import Title from "../../components/Title/Tlite";
import "./Wallet.css"
import api from "../../services/api";

//carteira
export default function Wallet() {
// saldo
  const [balance , setBalance] =useState(0);
   const [totalValue, setTotalValue] = useState(0);
  useEffect(() => {
    api.get('/wallet',{
       headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
    }

    )
    
      .then((response) =>{
  setBalance(response.data.balance);
   setTotalValue(response.data.totalValue);
      }) 
        
      
      .catch(() => alert('Erro ao carregar saldo'));
  }, []);
  return (
       <div className="wallet-container">
            <Title text="Minha Carteira" theme="h1" />
     
       <div className="balance-box">
        
        <strong>Saldo de Pontos:</strong>
        <p className="balance-value">{balance}</p>

     

  <strong>Saldo em Valor:</strong>
        <p className="balance-value">R$: {totalValue.toFixed(2)}</p>
        </div>
  
    </div>
  )
}
