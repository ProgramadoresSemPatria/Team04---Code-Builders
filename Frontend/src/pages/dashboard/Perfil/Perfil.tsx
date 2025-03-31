import { useAuthStore } from "@/store/useAuthStore"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import { Eye, EyeOff, Loader } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import api from "@/services/Api";


const Schema = z.object({
    name: z.string().nonempty('Nome obrigatório'),
    email: z.string().optional(),
    phone: z.string().optional().nullable(),
    serviceType: z.string().optional(),
    postalCode: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    neighborhood: z.string().optional().nullable(),
    password: z.string().optional(),
});

// Inferindo os tipos com base no schema Zod
type FormData = z.infer<typeof Schema>;


const Perfil = () => {
    const { authuser } = useAuthStore();
    const [loading,setLoading] = useState<boolean>(false)
    const [password,setPassword] = useState<boolean>(false)

    const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<FormData>({
            resolver: zodResolver(Schema), 
            defaultValues: {
                name: authuser?.name,
                email:authuser?.email,
                phone: authuser?.phone,
                serviceType: authuser?.serviceType,
                postalCode: authuser?.postalCode,
                address: authuser?.address,
                city: authuser?.city,
                neighborhood: authuser?.neighborhood
            },
    });
    

    const handleSalvar = async(data: FormData) => {
        try{
            const token = localStorage.getItem('token');
            const retorno = await api.patch(`/users/${authuser?.id}`,data,{
                headers: {
                    "Content-Type": "application/json",					
                    Authorization: token ? `Bearer ${token}` : '', // Adiciona o token se ele existir
                    
                },
            });	

           
            if(retorno){
                setLoading(false)
                toast.success(retorno.data.message);              
            }


        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }catch(error:any){
            setLoading(false)
            toast.error(error.response?.data?.message)
        }
    }

    return (
        <div>
            <Breadcrumb  pageName="Perfil"/>
            <div className="w-full bg-white rounded-lg shadow-md overflow-hidden mb-6 px-4 py-10" >
                <form onSubmit={handleSubmit(handleSalvar)} className="space-y-4">
                    <h1 className="font-bold text-2xl px-4">Editar dados</h1>
                    <div className="grid grid-cols-12 gap-5  py-10 px-4">
                        <div className="col-span-12 sm:col-span-6 md:col-span-3">
                            <label htmlFor="name" className="block text-sm text-gray-800 dark:text-gray-200">Nome</label>
                            <input 
                                {...register("name")}
                                placeholder="Nome"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className="col-span-12 sm:col-span-6 md:col-span-3">
                            <label htmlFor="email" className="block text-sm text-gray-800 dark:text-gray-200">E-mail</label>
                            <input 
                                {...register("email")}
                                placeholder="E-mail"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>

                        <div className="col-span-12 sm:col-span-6 md:col-span-3">
                            <label htmlFor="phone" className="block text-sm text-gray-800 dark:text-gray-200">Celular</label>
                            <input 
                                {...register("phone")}
                                placeholder="Celular"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                        </div>
                      

                        <div className="col-span-12 sm:col-span-6 md:col-span-3">
                            <label htmlFor="postalCode" className="block text-sm text-gray-800 dark:text-gray-200">Cep</label>
                            <input 
                                {...register("postalCode")}
                                placeholder="Cep"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errors.postalCode && <p className="text-red-500">{errors.postalCode.message}</p>}
                        </div>
                        <div className="col-span-12 sm:col-span-6 md:col-span-3">
                            <label htmlFor="address" className="block text-sm text-gray-800 dark:text-gray-200">Endereço</label>
                            <input 
                                {...register("address")}
                                placeholder="Endereço"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                        </div>
                        <div className="col-span-12 sm:col-span-6 md:col-span-3">
                            <label htmlFor="Bairro" className="block text-sm text-gray-800 dark:text-gray-200">Bairro</label>
                            <input 
                                {...register("neighborhood")}
                                placeholder="Bairro"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errors.neighborhood && <p className="text-red-500">{errors.neighborhood.message}</p>}
                        </div>
                        <div className="col-span-12 sm:col-span-6 md:col-span-3">
                            <label htmlFor="city" className="block text-sm text-gray-800 dark:text-gray-200">Cidade</label>
                            <input 
                                {...register("city")}
                                placeholder="Cidade"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                        </div>     
                        
                        <div className="col-span-12 sm:col-span-6 md:col-span-3">
                            <label htmlFor="password" className="block text-sm text-gray-800 dark:text-gray-200">Nova Senha</label>
                            <div className='relative'>		
                                <input 
                                    {...register("password")} 
                                    placeholder='***************' 
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                                    type={password ? 'text' : 'password'}
                                />
                                <button type='button' className='absolute inset-y-0 right-0 flex items-center pr-3' onClick={() => setPassword(!password)}>
                                    {password ? <Eye size={20} /> : <EyeOff size={20}/>}
                                </button>

                            </div>                  
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}				
                        </div>                   
                    </div>
                    <div className="flex justify-end px-4">
                        <Button type="submit">
                            {loading ? (
                                <Loader className="animate-spin" />
                            ) : (
                                "Salvar"
                            )}                            
                        </Button>

                    </div>
                            
                </form>

            </div>

        </div>
    )
}


export default Perfil
