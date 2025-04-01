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
    checkuser: () => Promise<void>;
  }

export const useAuthStore = create<AuthState>((set) => ({
    authuser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isCheckAuth: false,
    setUser: (authuser) => set({ authuser }),
    login : async(data : loginSchema) =>{
        set({isLoggingIn:true})

        try{
            const retorno = await api.post('/login', data);
          
             if (retorno?.data) {

                const { token, user } = retorno.data;

                localStorage.setItem("isPaymentDone", JSON.stringify(user.isPaymentDone));
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
    CheckAuth: async () => {
        set({ isCheckAuth: true }); 
    
        try {
            const storedAuthData = localStorage.getItem("AuthResponse");
      
    
            if (storedAuthData) {
                const authData = decryptData(storedAuthData);
                set({ authuser: authData});
            } else {
                set({ authuser: null });
            }
        } catch (err) {
            set({ authuser: null });
        } finally {
            set({ isCheckAuth: false }); // Finaliza a verificação
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
    checkuser : async()=>{

        try {
            const token = localStorage.getItem('token');
            if (token) {
                const retorno = await api.get(`/check-user`,{
                    headers: {
                        "Content-Type": "application/json",					
                        Authorization: token ? `Bearer ${token}` : '', // Adiciona o token se ele existir
                        
                    },
                });
                
                if(retorno){
                    localStorage.setItem("AuthResponse", encryptData(retorno.data)); 
                    set({ authuser: retorno.data });                 
                }             
                
            } 
        } catch (err) {
            set({ authuser: null });
        }
    }
        



}));

 
   