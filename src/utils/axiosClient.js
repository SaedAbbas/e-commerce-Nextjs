
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = "http://localhost:1337";
console.log('saed',process.env.STRAPI_API_URL);


const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
  params: {
    apiKey: apiKey,
  },
});

export default axiosClient;
