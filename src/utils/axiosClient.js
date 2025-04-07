import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  

const axiosClient = axios.create({
  baseURL: apiUrl,
  // headers: {
  //   Authorization: `Bearer ${apiKey}`,
  // },
  params: {
    apiKey: apiKey,
  },
});

export default axiosClient;
