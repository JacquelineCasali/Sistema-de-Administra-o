import {  useEffect, useState } from "react";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";
import "./AdminReport.css";

import { formatCPF } from "../../hooks/formatCPF";
import Title from "../Title/Tlite";
import { formatDate } from "../../hooks/formatDate";
import { toast } from "react-toastify";
import Button from "../Button/Button";
import Search from '../Search/Search';
export default function AdminReport() {
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);
const [busca, setBusca] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Selecione um arquivo!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Arquivo enviado com sucesso!");
      setFile(null);
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar arquivo");
    }
  };
  const fetchData = () => {
    setLoading(true);

    api
      .get("/admin/transactions", {
        params: { status, startDate, endDate },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Erro ao buscar relatório");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [status, startDate, endDate]);
  //corventendo para miniscula
  const searchLowerCase = busca.toLowerCase();
const dados = transactions.filter(
  (item) =>
    (item?.cpf ?? "").toLowerCase().includes(searchLowerCase) ||
       (item.description).toLowerCase().includes(searchLowerCase)||
(item?.value ?? "").toLowerCase().includes(searchLowerCase)
       
);

  return (
    <div className="admin-report-container">
      <Title text="Relatório de Transações (Admin)" theme="h1" />
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

     <Search
  busca={busca}
  setBusca={setBusca}
    />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={(e) => setFile(e.target.files[0])}
        />
            <Button text={"Enviar"} type="submit" theme={"amarelo"} />
        {/* <button type="submit">Enviar</button> */}
      </form>
      {loading ? (
        <Loading />
      ) : (
        <table>
          <thead>
            <tr>
              <th>CPF</th>
              <th>Descrição da transação</th>
              <th>Data da transação</th>
              <th>Usuário</th>
              <th>Email</th>
              <th>Valor em pontos</th>
              <th>Valor</th>

              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((item) => (
              <tr key={item.id}>
                <td>{formatCPF(item?.cpf)}</td>
                <td>{item.description}</td>
                <td>{formatDate(item.transactionDate)}</td>
                <td>{item?.name}</td>
                <td>{item?.email}</td>

                <td>{item.points}</td>
                <td>R$ {Number(item.value).toFixed(2)}</td>

                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
