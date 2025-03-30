import { Modal } from "@/components/Modal/Modal";
import { useForm as useFormModal } from "react-hook-form"; // Renomeando para evitar conflitos
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { GetAllClients } from "@/apis/clientes";
import { GetDadosProjeto } from "@/apis/projetos";
import { ClientesProps } from "@/@types/clientes";
import api from "@/services/Api";
import { Loader } from "lucide-react";

// Definindo o esquema de validação com Zod
const Schema = z.object({
    name: z.string().min(1, "Nome obrigatório"),
    clientId: z.preprocess((val) => Number(val), z.number().min(1, "Escolha um cliente")),
    price: z.preprocess((val) => Number(val), z.number().min(1, "Digite um preço")),
});

// Inferindo os tipos com base no schema Zod
type FormDataUpdate = z.infer<typeof Schema>;

interface EditarModalProps {
    projectId: number;
    open: boolean;
    onClose: () => void;
    buscarProjetos: () => void;
}

export const EditarModal = ({ projectId, open, onClose ,buscarProjetos}: EditarModalProps) => {

    const [clients,setClients] = useState<ClientesProps[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const {
        register: registerModal,
        handleSubmit: handleSubmitModal,
        formState: { errors: errorsModal },
        reset: resetModal,
    } = useFormModal<FormDataUpdate>({resolver: zodResolver(Schema),});useFormModal<FormDataUpdate>()
    //   } = useForm<FormDataCreate>({resolver: zodResolver(Schema),});useForm<FormDataCreate>();

    // Função para buscar os dados do cliente
    const BuscarDados = useCallback(async () => {
        try {
            const response = await GetDadosProjeto(projectId);
            resetModal({
                name: response.name || "",
                price: Number(response.price) || 0,
                clientId: Number(response.clientId) || 0,
            });

        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    }, [projectId, resetModal]);


    const BuscarClientes = useCallback(async () => {
        const response = await GetAllClients();
        setClients(response);	
    },[])


    // Usando useEffect para chamar a função de buscar dados
    useEffect(() => {
        if (projectId) {
            BuscarDados();
        }

        BuscarClientes();
    }, [BuscarDados, projectId,BuscarClientes]);

       


    // Função de atualização do cadastro
    const AtualizarCadastro = async (data: FormDataUpdate) => {
        setLoading(true)
        try{

			
			const token = localStorage.getItem('token');
			const retorno = await api.patch(`/projects/${projectId}`,data,{
				headers: {
					"Content-Type": "application/json",					
					Authorization: token ? `Bearer ${token}` : '', // Adiciona o token se ele existir
					
				},
			});	

            setLoading(false)
			if(retorno){

				resetModal({
					name: "",
					clientId: 0,
					price:0
				});
	
				toast.success(retorno.data.message);
				onClose()
                buscarProjetos()
			}


		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		}catch(error:any){
            setLoading(false)
			toast.error(error.response?.data?.message)
		}

    };



    return (
        <div>
            <Modal isOpen={open} onClose={onClose} className="max-w-[500px] p-5">
                <form onSubmit={handleSubmitModal(AtualizarCadastro)} className="mt-6">
                    <h1 className="font-bol text-2xl">Editar Projeto</h1>
                    <div className="grid grid-cols-12 gap-2 py-4">
                        <div className="col-span-12">
                            <label htmlFor="name" className="block text-sm text-gray-800 dark:text-gray-200">Nome</label>
                            <input {...registerModal("name")} placeholder="Nome do Projeto" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                            {errorsModal.name && <p className="text-red-500">{errorsModal.name.message}</p>}
                        </div>
                        <div className="col-span-12">
                            <label htmlFor="email" className="block text-sm text-gray-800 dark:text-gray-200">Cliente</label>
                            <select {...registerModal("clientId")}	className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
                                <option value="">Selecione...</option>
                                {clients.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.name}
                                    </option>
                                ))}
                                
                            </select>
                            {errorsModal.clientId && <p className="text-red-500">{errorsModal.clientId.message}</p>}
                        </div>


                        <div className="col-span-12">
                            <label htmlFor="phone" className="block text-sm text-gray-800 dark:text-gray-200">Preço</label>
                            <input {...registerModal("price")} placeholder="Preço" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                            {errorsModal.price && <p className="text-red-500">{errorsModal.price.message}</p>}
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
