import axios from "axios";
import { API_URL } from "./apiUrl.js";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensure credentials like cookies are sent
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
