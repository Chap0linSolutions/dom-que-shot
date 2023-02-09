import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_ADRESS,
});

export default api;
