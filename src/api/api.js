import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error:", err.message);
    return Promise.reject(err);
  }
);
