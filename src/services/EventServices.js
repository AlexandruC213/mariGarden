import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "appliction/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default {
  fetchProducts() {
    return apiClient.get("/products");
  },
  fetchProduct(id) {
    return apiClient.get("/products/" + id);
  },
  fetchReviews() {
    return apiClient.get("/reviews");
  },
  postReview(review) {
    return apiClient.post("/reviews/", review);
  },
};
