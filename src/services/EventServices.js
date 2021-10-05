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
  getProducts() {
    return apiClient.get("/products");
  },
  getProductDetails(id) {
    return apiClient.get("/products/" + id);
  },
};
