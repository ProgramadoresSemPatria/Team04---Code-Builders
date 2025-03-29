/* eslint-disable @typescript-eslint/no-unused-vars */
// import toast from "react-hot-toast";
import toast from "react-hot-toast";
import { create } from "zustand";


interface userSchema{
    id: number;
    name: string;
    email: string;
    password: string;   
    plans: string;
}


interface loginSchema{
    email :string,
    password :string    
}


const logins = [
    {id:1,name:'Breno Silva',email:'brenosill@hotmail.com',password:'123456',plans:'Empresarial'},
    {id:2,name:'Breno ',email:'brenobsdo1740365@hotmail.com',password:'123456',plans:'Básico'},
]


interface AuthState {
    authuser: userSchema | null;
    isSigninUp: boolean;
    isLoggingIn: boolean;
    isCheckAuth: boolean;
    setUser: (authuser: userSchema) => void;
    CheckAuth: () => Promise<void>;
    logout: () => Promise<void>;
    login : (data : loginSchema) => Promise<boolean>;
  }

export const useAuthStore = create<AuthState>((set) => ({
    authuser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isCheckAuth: false,
    setUser: (authuser) => set({ authuser }),
    CheckAuth: async () => {
        try {       
            const id = localStorage.getItem('id');

            if (id) {                
                const user = logins.find((item) => item.id === Number(id));
                set({ authuser: user, isCheckAuth: true });
            }
        } catch (err) {
            console.log(err);
            set({ authuser: null, isCheckAuth: true });
        } finally {
            set({ isCheckAuth: false });
        }
    },
   // singup : async (data) => {

    //     set({isSigninUp :true})

    //     try {
    //         const ret = await api.post('/user/signup', data, {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });
    //         set({authuser : ret.data })
    //        toast.success(ret.message)

    //     } catch (error ) {
    //         const errorMessage = error.response?.data?.message || "Erro ao se cadastrar";
    //         toast.error(errorMessage);
        
    //     }finally{
    //         set({isSigninUp:false})
    //     }

    // },
    logout : async () =>{

        try {   
            
            localStorage.clear();
            set({ authuser: null, });
            toast.success('Loggout')

        } catch (error) {

            // toast.error(error.response.data.message)
            toast.error('Erro no login')
        }
    
    },
    login : async(data : loginSchema) =>{
        set({isLoggingIn:true})

        try{
               
            const res = logins.find((item) => item.email === data.email && item.password === data.password);

            if(res){                                
                localStorage.setItem('id',String(res?.id));
                set({authuser: res});
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

 
   