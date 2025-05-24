import { useState } from "react";

import { useEffect } from "react";
import Title from "../../components/Title/Tlite";
import "./Wallet.css";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";
//carteira
export default function Wallet() {
  // saldo
  const [balance, setBalance] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      api
        .get("/wallet", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        .then((response) => {
          setBalance(response.data.balance);
          setTotalValue(response.data.totalValue);
          setLoading(false);
        });
    } catch (err) {
      toast.error(err.response.data.message);
      console.error("Login error:", err);
    }
  }, []);
  if (loading) {
    return <Loading />;
  }

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
  );
}
