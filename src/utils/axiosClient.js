import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  

const axiosClient = axios.create({
  baseURL: apiUrl,

});

export default axiosClient;
