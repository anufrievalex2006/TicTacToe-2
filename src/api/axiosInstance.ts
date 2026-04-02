import Axios from "axios"

const API_BASE = "http://localhost:8080/api"
export const api = Axios.create({
    baseURL: API_BASE,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use((res) => {
    return res;
}, (error) => {
    if (error.response && error.response.status === 401) {
        console.error("Auth error");
        localStorage.removeItem("token");
        if (window.location.pathname !== "/login" && window.location.pathname !== "/register")
            window.location.href = "/login";
    }
    return Promise.reject(error);
});