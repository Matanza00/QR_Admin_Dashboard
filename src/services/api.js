import axios from "axios";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Replace with your actual API base URL
  // timeout: 10000, // Set a timeout in milliseconds if needed
});

// Interceptor to add Bearer token if available
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // Replace with your actual token retrieval logic

//   if (token) {
//     config.headers.authorization = `Bearer ${token}`;
//   }

//   return config;
// });

axios.interceptors.request.use((req) => {
  console.log(JSON.stringify(req, null, 2));
  return req;
});

export default api;
