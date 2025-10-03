import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080"
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Signup call
export const signup = async (username, password,name) => {
  const res = await API.post("/auth/signup", { username, password, name});
  return res.data;
}

// Login call
export const login = async (username, password) => {
  const res = await API.post("/auth/login", { username, password });
  return res.data;
}

export default API;
