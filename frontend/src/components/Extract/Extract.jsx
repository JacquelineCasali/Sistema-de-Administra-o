import { useEffect, useState } from "react";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";
import "./Extract.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { formatCPF } from "../../hooks/formatCPF";
import Title from "../Title/Tlite";

export default function Extract() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
const { user } = useContext(AuthContext);
  useEffect(() => {
    api
      .get("/transactions", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setTransactions(response.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Erro ao carregar transações");
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="extract-container">
       <Title text="Extrato de Transações" theme="h1" />

     <strong></strong>
      <table>
        <thead>
          <tr>
         <th>CPF</th>
            <th>Descrição da Transação</th>
               <th>Data da transação</th>
            <th>Valor em pontos
</th>
            <th>Valor
</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr key={item.id}>
                <td>{formatCPF(user?.cpf)}</td>
                    <td>{item.description}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
          
              <td>R$ {Number(item.value).toFixed(2)}</td>
              <td>{item.points}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
