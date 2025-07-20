import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const loginUser = async (credentials) => {
  const response = await API.post("/login", credentials);
  return response;
};

export const registerUser = async (userData) => {
  const response = await API.post("/register", userData);
  return response.data;
};

export const verifyToken = async (token) => {
  const response = await axios.get("http://localhost:5000/api/auth/verify", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
