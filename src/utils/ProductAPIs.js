const { default: axiosClient } = require("./axiosClient");

const getLatestProducts = () => {
  return axiosClient.get("/api/products?populate=*");
};

const getProductById = (id) => {
  return axiosClient.get(`/api/products?filters[id][$eq]=${id}&populate=*`)
};
const getProductsByCategory = (catName) => {
  return axiosClient.get(`/api/products?filters[category][$eq]=${catName}&populate=*`)
};

export default {
  getLatestProducts,
  getProductById,
  getProductsByCategory,
};
