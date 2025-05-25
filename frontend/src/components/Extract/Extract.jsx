import { useEffect, useState } from "react";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";
import "./Extract.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { formatCPF } from "../../hooks/formatCPF";
import Title from "../Title/Tlite";
import { toast } from "react-toastify";
import { formatDate } from "../../hooks/formatDate";

export default function Extract() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
   const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    api
      .get("/transactions", {
              params: { status, startDate, endDate },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setTransactions(response.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.error("Error:", err);
    
      });
  }, [status, startDate, endDate]);

  if (loading) return <Loading />;

  return (
    <div className="extract-container">
      <Title text="Extrato de Transações" theme="h1" />
  <div className="filters">
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Todos</option>
            <option value="aprovado">Aprovado</option>
            <option value="reprovado">Reprovado</option>
            <option value="avaliando">Avaliando</option>
          </select>
        </label>

        <label>
          Data Inicial:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label>
          Data Final:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
    </div>
      <table>
        <thead>
          <tr>
            <th>CPF</th>
            <th>Descrição da Transação</th>
            <th>Data da transação</th>
            <th>Valor em pontos</th>
            <th>Valor</th>
            <th>Status</th>

          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr key={item.id}>
              <td>{formatCPF(user?.cpf)}</td>
              <td>{item.description}</td>
           <td>{formatDate(item.transactionDate)}</td>

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
