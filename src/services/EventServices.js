import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "apliction/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default {
  fetchProducts(perPage, page) {
    return apiClient.get("/products?_limit=" + perPage + "&_page=" + page);
  },
  fetchProductDetails(id) {
    return apiClient.get("/products/" + id);
  },
  fetchAllProducts() {
    return apiClient.get("/products");
  },
  fetchReviews() {
    return apiClient.get("/reviews");
  },
  postReview(review) {
    return apiClient.post("/reviews", review);
  },
};
