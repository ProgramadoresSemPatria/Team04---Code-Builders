import axios from "axios";

const api = axios.create({
    baseURL: 'https://apis-slyz.onrender.com/api', 
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