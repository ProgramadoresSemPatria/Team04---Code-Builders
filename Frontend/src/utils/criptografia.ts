import { AuthResponse } from "@/@types/usuario";
import CryptoJS from "crypto-js";
const SECRET_KEY = "chave-super-secreta"; // Mantenha essa chave segura e nunca exponha no front-end

// Função para criptografar os dados antes de salvar no localStorag
// interface PropsData{
//     user:AuthResponse
// }



const encryptData = (data: AuthResponse): string => {
    // Criptografa o objeto e converte para string
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    return encrypted;
};

// Função para descriptografar os dados ao recuperar do localStorage
const decryptData = (encryptedData: string): AuthResponse | null => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        
        // Verifica se a string descriptografada não está vazia e a converte em um objeto AuthResponse
        return decryptedData ? JSON.parse(decryptedData) : null;
    } catch (error) {
        console.error("Erro ao descriptografar os dados:", error);
        return null;
    }
};


export { encryptData,decryptData}