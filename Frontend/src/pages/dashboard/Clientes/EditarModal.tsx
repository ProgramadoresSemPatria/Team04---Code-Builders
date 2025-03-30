import { Modal } from "@/components/Modal/Modal";
import { useForm as useFormModal } from "react-hook-form"; // Renomeando para evitar conflitos
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { GetDadosCliente } from "@/apis/clientes";
import api from "@/services/Api";
import { Loader } from "lucide-react";

// Definindo o esquema de validação com Zod
const AtualizarClienteSchema = z.object({
    name: z.string().nonempty('Nome obrigatório'),
    email: z.string().optional(),
    phone: z.string().optional(),
    postalCode: z.string().optional().nullable(),
});

// Inferindo os tipos com base no schema Zod
type FormDataUpdate = z.infer<typeof AtualizarClienteSchema>;

interface EditarModalProps {
    clientid: number;
    open: boolean;
    onClose: () => void;
    buscarClientes: () => void;
}

export const EditarModal = ({ clientid, open, onClose,buscarClientes }: EditarModalProps) => {
    const [loading,setLoading] = useState<boolean>(false)
    const {
        register: registerModal,
        handleSubmit: handleSubmitModal,
        formState: { errors: errorsModal },
        reset: resetModal,
    } = useFormModal<FormDataUpdate>({
        resolver: zodResolver(AtualizarClienteSchema),
    
    });

    // Função para buscar os dados do cliente
    const BuscarDados = useCallback(async () => {
        try {
            const response = await GetDadosCliente(clientid);
            resetModal({
                name: response.name || "",
                email: response.email,
                phone: response.phone,
                postalCode: response.postalCode || "",
            });
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    }, [clientid, resetModal]);


    useEffect(() => {
        if (clientid) {
            BuscarDados();
        }
    }, [BuscarDados, clientid]);

    // Função de atualização do cadastro
    const AtualizarCadastro = async (data: FormDataUpdate) => {     
        
        setLoading(true)

        try{
            const token = localStorage.getItem('token');
            const retorno = await api.patch(`/clients/${clientid}`	, data,{
                headers: {
                    "Content-Type": "application/json",					
                    Authorization: token ? `Bearer ${token}` : '', // Adiciona o token se ele existir
                    
                },
            });	

            resetModal({
                email: "",
                name: "",
                phone:"",
            });

            setLoading(false)
            buscarClientes()
            toast.success(retorno.data.message);
            onClose()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }catch(error:any){
            setLoading(false)
            toast.error(error.response?.data?.message)
            onClose()

        }
    };

    return (
        <div>
            <Modal isOpen={open} onClose={onClose} className="max-w-[500px] p-5">
                <form onSubmit={handleSubmitModal(AtualizarCadastro)} className="mt-6">
                    <h1 className="font-bold text-2xl">Editar Cliente</h1>
                    <div className="grid grid-cols-12 gap-2 py-4">
                        <div className="col-span-12">
                            <label htmlFor="name" className="block text-sm text-gray-800 dark:text-gray-200">Nome</label>
                            <input 
                                {...registerModal("name")}
                                placeholder="Nome"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errorsModal.name && <p className="text-red-500">{errorsModal.name.message}</p>}
                        </div>

                        <div className="col-span-12">
                            <label htmlFor="age" className="block text-sm text-gray-800 dark:text-gray-200">E-mail</label>
                            <input 
                                {...registerModal("email")}
                          
                                placeholder="E-mail"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errorsModal.email && <p className="text-red-500">{errorsModal.email.message}</p>}
                        </div>

                        <div className="col-span-12">
                            <label htmlFor="city" className="block text-sm text-gray-800 dark:text-gray-200">Celular</label>
                            <input 
                                {...registerModal("phone")}
                                placeholder="Celular"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errorsModal.phone && <p className="text-red-500">{errorsModal.phone.message}</p>}
                        </div>

                        <div className="col-span-12">
                            <label htmlFor="city" className="block text-sm text-gray-800 dark:text-gray-200">Cep</label>
                            <input 
                                {...registerModal("postalCode")}
                                placeholder="Cep"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errorsModal.postalCode && <p className="text-red-500">{errorsModal.postalCode.message}</p>}
                        </div>
                    </div>

                    <div className="flex items-center justify-end w-full gap-3 mt-8">
                        <Button variant="destructive" onClick={onClose}>Fechar</Button>
                        <Button type="submit" 	disabled={loading}>							
                            {loading ? (
                                <Loader className="animate-spin" />
                            ) : (
                                "Entrar"
                            )}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
