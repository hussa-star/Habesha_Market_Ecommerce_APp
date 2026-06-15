import axios from "axios";

/*
=================================
AXIOS INSTANCE
=================================
*/

const Instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default Instance;
