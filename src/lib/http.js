import axios from "axios";

const http = axios.create({
    // baseURL: "http://localhost:4100/api/v2/directory",
    baseURL: "https://ccendpoints.herokuapp.com/api/v2/directory",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
    },
});

// http.interceptors.request.use((config) => {
//     const { intercept = true } = config;
//     if (!intercept) return config;
//     const token = localStorage.getItem("property_admin")
//         ? JSON.parse(localStorage.getItem("property_admin"))
//         : null;
//     if (token?.token) config.headers["authorization"] = token?.token;
//     return config;
// });

export default http;