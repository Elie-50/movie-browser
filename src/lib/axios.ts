import axios from "axios";

const OMDB_API_KEY = "9977be87";

export const api = axios.create({
  baseURL: "https://www.omdbapi.com/",
});

api.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    apikey: OMDB_API_KEY,
  };
  return config;
});
