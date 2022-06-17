import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "https://mari-garden-default-rtdb.europe-west1.firebasedatabase.app/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default {
  fetchProducts() {
    return apiClient.get("/products.json");
  },
  fetchProduct(id) {
    const newId = id - 1;
    return apiClient.get("/products/" + newId + ".json");
  },
  fetchReviews() {
    return apiClient.get("/reviews.json");
  },
};
