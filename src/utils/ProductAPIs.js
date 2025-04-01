const { default: axiosClient } = require("./axiosClient");

const getLatestProducts = () => {
  return axiosClient.get("/products?populate=*");
};

const getProductById = (id) => {
  return axiosClient.get(`/products?filters[id][$eq]=${id}&populate=*`)
};
const getProductsByCategory = (catName) => {
  return axiosClient.get(`/products?filters[category][$eq]=${catName}&populate=*`)
};

export default {
  getLatestProducts,
  getProductById,
  getProductsByCategory,
};
