import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export default api;

export const createSenha = async (email, password) => {
  const url = `/senha`;
  return api.post(url, {email: email, password: password});
};