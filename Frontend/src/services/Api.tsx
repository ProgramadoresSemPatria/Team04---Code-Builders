import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5050/api" : '/api',    
});


api.interceptors.response.use(
    (response) => {
        const newToken = response.headers["authorization"]; // Captura o token do header
      
        if (newToken) {
            localStorage.setItem("token", newToken); // Atualiza o token no localStorage
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default api