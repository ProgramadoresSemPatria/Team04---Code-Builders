import { Modal } from "@/components/Modal/Modal";
import { useForm as useFormModal } from "react-hook-form"; // Renomeando para evitar conflitos
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useCallback, useEffect } from "react";
import { GetDadosCliente } from "@/apis/clientes";

// Definindo o esquema de validação com Zod
const AtualizarClienteSchema = z.object({
    name: z.string().nonempty('Nome obrigatório'),
    age: z.string().optional(),
    city: z.string().optional().nullable(),
});

// Inferindo os tipos com base no schema Zod
type FormDataUpdate = z.infer<typeof AtualizarClienteSchema>;

interface EditarModalProps {
    clientid: number;
    open: boolean;
    onClose: () => void;
}

export const EditarModal = ({ clientid, open, onClose }: EditarModalProps) => {
    // Usando o useForm renomeado como useFormModal para evitar conflito com o useForm do componente principal
    const {
        register: registerModal,
        handleSubmit: handleSubmitModal,
        formState: { errors: errorsModal },
        reset: resetModal,
    } = useFormModal<FormDataUpdate>({
        resolver: zodResolver(AtualizarClienteSchema),
        // defaultValues: {
        //     email: "",
        //     name: "",
        //     age: "",
        //     city: "",
        // },
    });

    // Função para buscar os dados do cliente
    const BuscarDados = useCallback(async () => {
        try {
            const response = await GetDadosCliente(clientid);
            resetModal({
                name: response.name || "",
                age: String(response.age),
                city: response.city || "",
            });
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    }, [clientid, resetModal]);

    // Usando useEffect para chamar a função de buscar dados
    useEffect(() => {
        if (clientid) {
            BuscarDados();
        }
    }, [BuscarDados, clientid]);

    // Função de atualização do cadastro
    const AtualizarCadastro = async (data: FormDataUpdate) => {
        console.log("Dados recebidos no AtualizarCadastro:", data);
        try {
            // Enviar os dados para a API de atualização (isso deve ser implementado)
            toast.success("Cadastro atualizado com sucesso");
        } catch (error) {
            console.log(error)
            toast.error("Erro ao atualizar o cadastro");
        } finally {
            onClose(); // Fecha o modal após o envio
        }
    };

    return (
        <div>
            <Modal isOpen={open} onClose={onClose} className="max-w-[500px] p-5">
                <form onSubmit={handleSubmitModal(AtualizarCadastro)} className="mt-6">
                    <h1>Editar Cliente {clientid}</h1>
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
                            <label htmlFor="age" className="block text-sm text-gray-800 dark:text-gray-200">Idade</label>
                            <input 
                                {...registerModal("age")}
                                type="number"
                                placeholder="Idade"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errorsModal.age && <p className="text-red-500">{errorsModal.age.message}</p>}
                        </div>

                        <div className="col-span-12">
                            <label htmlFor="city" className="block text-sm text-gray-800 dark:text-gray-200">Cidade</label>
                            <input 
                                {...registerModal("city")}
                                placeholder="Cidade"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errorsModal.city && <p className="text-red-500">{errorsModal.city.message}</p>}
                        </div>
                    </div>

                    <div className="flex items-center justify-end w-full gap-3 mt-8">
                        <Button variant="destructive" onClick={onClose}>Fechar</Button>
                        <Button type="submit">Gravar</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
