import { useState } from "react";
import api from "../../services/api";
import { useEffect } from "react";


//carteira
export default function Wallet() {
// saldo
  const [balance , setBalance] =useState(0);
  useEffect(() => {
    api.get('/wallet')
      .then(response => setBalance(response.data.balance))
      .catch(() => alert('Erro ao carregar saldo'));
  }, []);
  return (
       <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Minha Carteira</h1>
      <div className="bg-white rounded-xl shadow-md p-4">
        <p className="text-lg">Saldo de Pontos:</p>
        <p className="text-4xl font-semibold text-green-600">{balance}</p>
      </div>
    </div>
  )
}
