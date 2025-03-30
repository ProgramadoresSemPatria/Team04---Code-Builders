import { useState } from "react"
import {Link} from "react-router-dom"
import { BarChart3, Eye, EyeOff, Loader } from "lucide-react"
import { useAuthStore } from "../../store/useAuthStore"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";



const LoginSchema = z.object({
    email: z.string().email("Formato de e-mail inválido"),
    password: z.string().min(3,"Senha menor que 3 caracteres"),
});

type FormData = z.infer<typeof LoginSchema>;

const SignIn = ()=> {

    const {isLoggingIn,login} = useAuthStore();

    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>({resolver: zodResolver(LoginSchema),});useForm<FormData>();

    const onSubmit = async(data: FormData) => {
        await await login(data);

    };

  return (

    <div className="flex h-screen w-full flex-col items-center justify-center">
        <Link to="/" className="absolute left-4 top-4 md:left-8 md:top-8">
            <button type="button" className="flex items-center gap-1">
                <BarChart3 className="h-5 w-5" />
                <span className="font-bold">FreelancerCRM</span>
            </button>
        </Link>

        <div className="w-full  max-w-sm md:max-w-lg  p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="py-5 flex flex-col">
                <h1 className="text-2xl font-bold">Entrar</h1>
                <p className="pt-3 from-neutral-100">Entre com seu e-mail e senha para acessar sua conta</p>
            </div>
            

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                <div>
                    <label htmlFor="email" className="block text-sm text-gray-800 dark:text-gray-200">E-mail</label>
                    <input {...register("email")} placeholder="Nome" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>

                <div className="mt-4">
                    <label htmlFor="password" className="block text-sm text-gray-800 dark:text-gray-200">Senha</label>
                    <div className='relative'>		
                        <input 
                            {...register("password")} 
                            placeholder='***************' 
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                            type={showPassword ? 'text' : 'password'}
                        />
                        <button type='button' className='absolute inset-y-0 right-0 flex items-center pr-3' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <Eye size={20} /> : <EyeOff size={20}/>}
                        </button>

                    </div>                  
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}				
                </div>

                <div className="mt-6">
                    <button
                        className="w-full cursor-pointer btn btn-sm bg-[#18181B] text-white p-2 rounded-md text-center flex justify-center items-center"
                        type="submit"
                        disabled={isLoggingIn}
                        >
                        {isLoggingIn ? (
                            <Loader className="animate-spin" />
                        ) : (
                            "Entrar"
                        )}
                    </button>


                </div>
            </form>
            <p className="mt-8 text-md font-light text-center text-black text-bold"> Não tem uma conta? <a href="signup" className="font-medium text-black text-bold dark:text-gray-200 hover:underline">Cadastre-se</a></p>
        </div>

     
    </div>
  )
}


export default SignIn

