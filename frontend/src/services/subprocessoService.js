import api from "./api";

export const getSubprocesso = async () => {
  const response = await api.get("/subprocesso",
    {headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
   }
  );


  return response.data;
};


export const getSubProcessosPorProcesso = async (processoId) => {
  const response = await api.get(`/subprocesso?processoId=${processoId}`,
    {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
   }
  );
  return response.data;
};
