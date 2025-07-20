import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add auth token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchPotholes = async (params = {}) => {
  const response = await API.get("/potholes", { params });
  console.log(response);
  return response.data;
};

export const createPothole = async (potholeData) => {
  const response = await API.post("/potholes", potholeData);
  return response.data;
};

export const getPotholeById = async (id) => {
  const response = await API.get(`/potholes/${id}`);
  return response.data;
};

export const voteOnPothole = async (id, voteType) => {
  const response = await API.put(`/potholes/${id}/vote`, { voteType });
  return response.data;
};

export const addComment = async (id, text) => {
  const response = await API.post(`/potholes/${id}/comments`, { text });
  return response.data;
};
