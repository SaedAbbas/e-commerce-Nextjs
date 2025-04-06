import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = process.env.STRABI_API_TOKEN;
console.log('saed',apiUrl);


const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${process.env.STRABI_API_TOKEN}`,
  },
  params: {
    apiKey: apiKey,
  },
});

export default axiosClient;
