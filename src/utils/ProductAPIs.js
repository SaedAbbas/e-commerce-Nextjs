const { default: axiosClient } = require("./axiosClient");

const getLatestProducts = () => {
  return axiosClient.get("/products?populate=*");
};

const getProductById = (id) => {
  return axiosClient.get(`/products/${id}?populate=*`);
};

export default {
  getLatestProducts,
  getProductById,
};
