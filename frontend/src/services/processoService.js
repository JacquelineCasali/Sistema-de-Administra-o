import api from "./api";

export const getAreas = async () => {
  const response = await api.get("/area",
    {headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
   }
  );
  return response.data;
};

export const getProcessosPorArea = async (areaId) => {
  const response = await api.get(`/processo?areaId=${areaId}`,
    {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
   }
  );
  return response.data;
};