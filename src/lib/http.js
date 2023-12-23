import axios from "axios";

const http = axios.create({
    baseURL: "https://ccendpoints.herokuapp.com/api/v2/money-trail",
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