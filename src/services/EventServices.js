import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "apliction/json",
    "Content-Type": "aplication/json",
  },
});

export default {
  fetchProducts(perPage, page) {
    return apiClient.get("/products?_limit=" + perPage + "&_page=" + page);
  },
  fetchProductDetails(id) {
    return apiClient.get("/products/" + id);
  },
};
