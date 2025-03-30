/* eslint-disable @typescript-eslint/no-unused-vars */
// import toast from "react-hot-toast";
import api from "@/services/Api";
import toast from "react-hot-toast";
import { create } from "zustand";
import { decryptData, encryptData } from "@/utils/criptografia";
import { AuthResponse} from "@/@types/usuario";


interface loginSchema{
    email :string,
    password :string    
}

interface CreateSchema{
    name :string,
    password :string    
    confirmPassword :string    
    email :string    
    serviceType :string    
}

interface AuthState {
    authuser: AuthResponse | null;
    isSigninUp: boolean;
    isLoggingIn: boolean;
    isCheckAuth: boolean;
    setUser: (authuser: AuthResponse) => void;
    CheckAuth: () => Promise<void>;
    login : (data : loginSchema) => Promise<boolean>;
    signup : (data : CreateSchema) => Promise<boolean>;
    logout: () => Promise<void>;
  }

export const useAuthStore = create<AuthState>((set) => ({
    authuser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isCheckAuth: false,
    setUser: (authuser) => set({ authuser }),
    CheckAuth: async () => {

        try {       
            const storedAuthData = localStorage.getItem("AuthResponse");

            if (storedAuthData) {

                const authData = decryptData(storedAuthData);
                set({ authuser: authData, isCheckAuth: true });
            }
           
        } catch (err) {
            set({ authuser: null, isCheckAuth: true });
        } finally {
            set({ isCheckAuth: false });
        }
    },
    signup : async (data : CreateSchema) => {

        set({isSigninUp :true})
   

        try {
            const retorno = await api.post('/signup', data);        
            toast.success(retorno.data.message)
            return true

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (erro : any ) {
            const errorMessage = erro.response?.data?.message
            toast.error(errorMessage);
            return false
        
        }finally{
            set({isSigninUp:false})
        }

    },
    logout : async () =>{

        try {   
            
            localStorage.clear();
            set({ authuser: null, });
            toast.success('Loggout')

        } catch (error) {
            toast.error('Erro ao sair')
        }
    
    },
    login : async(data : loginSchema) =>{
        set({isLoggingIn:true})

        try{
            const retorno = await api.post('/login', data);
          
             if (retorno?.data) {

                const { token, user } = retorno.data;

                localStorage.setItem("token", token);
                localStorage.setItem("AuthResponse", encryptData(user)); 
                set({ authuser: user });
                
                toast.success('Success')
                return true
            }
        
            
            toast.error('E-mail ou senha inválidos')
            return true

        } catch (error) {
            // toast.error(error.response.data.message)
            toast.error('Erro no login')

            return true
        }finally{

            set({isLoggingIn:false})
        }
    

    },

}));

 
   