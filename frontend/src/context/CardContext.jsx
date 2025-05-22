import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const CardContext = createContext({});
export default function CardProvider({ children }) {
  const [busca, setBusca] = useState("");
  const [areas, setAreas] = useState([]);
  const [processos, setProcessos] = useState([]);
  const [subprocessos, setSubprocessos] = useState([]);
  const { token } = useContext(AuthContext);
  const [areaSelecionada, setAreaSelecionada] = useState(''); // Inicia sem área selecionada
  const searchLowerCase = busca.toLowerCase();
  const areaFilter = areas.filter((p) =>
    p.nome.toLowerCase().includes(searchLowerCase)
  );
  const dados = processos.filter((p) => p.nome.toLowerCase().includes(searchLowerCase)
    //  funcionario.job.toLowerCase().includes(searchLowerCase)||
    //  funcionario.phone.toLowerCase().includes(searchLowerCase)
  );

  
  const sub = subprocessos.filter(
    (p) => p.nome.toLowerCase().includes(searchLowerCase)
    //  funcionario.job.toLowerCase().includes(searchLowerCase)||
    //  funcionario.phone.toLowerCase().includes(searchLowerCase)
  );
  useEffect(() => {
    listarAreas();
    listarProcessos(); // Carrega todos os processos por padrão
  }, []);
  useEffect(() => {
    listarProcessos(areaSelecionada); // Atualiza quando uma área for selecionada
  }, [areaSelecionada]);
  const listarProcessos = async (areaId = "") => {
    //  banco de dados

    try {
      const url = areaId
        ? `http://localhost:3001/processo?areaId=${areaId}`
        : `http://localhost:3001/processo`;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProcessos(res.data);
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };

  const listarAreas = async () => {
    //  banco de dados

    try {
      api.get(`/area`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setAreas(res.data);
        });
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    //  banco de dados
    const fetchSubprocessos = async () => {
      try {
        api
          .get(`/subprocesso `, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setSubprocessos(res.data);
          });
      } catch (err) {
        console.error(err);
        toast.error(err.response.data.message);
      }
    };
    fetchSubprocessos();
  }, []);

  return (
    <CardContext.Provider
      value={{
        dados,
        setProcessos,
        busca,
        setBusca,
        subprocessos,
        sub,
        areaFilter,
        areas,
        setAreaSelecionada
      }}
    >
      {children}
    </CardContext.Provider>
  );
}
