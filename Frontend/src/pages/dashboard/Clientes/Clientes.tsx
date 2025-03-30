import React, { useState,useCallback, useEffect} from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight ,Plus, Edit, Loader, Trash2} from "lucide-react";
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { GetAllClients } from "@/apis/clientes";
import { ClientesProps } from "@/@types/clientes";
import { Modal } from "@/components/Modal/Modal";
import { EditarModal } from "./EditarModal";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import api from "@/services/Api";

type DataType = {id: number,name: string; email: string; phone: string;postalCode: string;};

const columns: { key: keyof DataType | "action"; label: string }[] = [
	{ key: "id", label: "#ID" },
	{ key: "name", label: "Nome" },
	{ key: "email", label: "E-mail" },
	{ key: "phone", label: "Celular" },
	{ key: "postalCode", label: "Cep" },
	{ key: "action", label: "Ação" }, // Coluna para ações, mas não vai nos dados
];

const CadastroClienteSchema = z.object({
	email: z.string().email("Formato de e-mail inválido"),
	name: z.string().nonempty('Nome obrigatório'),
	phone: z.string().nonempty('Celular obrigatório'),
});

type FormDataCreate = z.infer<typeof CadastroClienteSchema>;


const Clientes = () => {
	
	const [loading,setLoading] = useState<boolean>(false)
	const [clientes,setClientes] = useState<ClientesProps[]>([])
	const [isOpen,setisOPen] = useState<boolean>(false)
	const [IsModalUpdate,setIsModalUpdate] = useState<boolean>(false)
	const [clientId,setClientId] = useState<number>(0)
	const [search, setSearch] = useState("");
	const [sortConfig, setSortConfig] = useState<{ key: keyof DataType; direction: "asc" | "desc" }>({
		key: "name",
		direction: "asc",
	  });

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
		setCurrentPage(1);
	};


	const handleSort = (key: keyof DataType) => {
		let direction: "asc" | "desc" = "asc"; // Define o tipo corretamente
		if (sortConfig.key === key && sortConfig.direction === "asc") {
		  direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	const filteredData = clientes.filter((item) => {
		return (
			item.name.toLowerCase().includes(search.toLowerCase()) ||
			item.email.toLowerCase().includes(search.toLowerCase())
		);
	});

	const sortedData = [...filteredData].sort((a, b) => {
		if (sortConfig.key === null) return 0;
		const aValue = a[sortConfig.key as keyof DataType];
		const bValue = b[sortConfig.key as keyof DataType];
		if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
		if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
		return 0;
	});

	const pageCount = Math.ceil(sortedData.length / itemsPerPage);

	const currentPageData = sortedData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const onNextPage = useCallback(() => {
		setCurrentPage(Math.max(1, currentPage - 1))
	}, [currentPage]);

	const onPreviousPage = useCallback(() => {
		setCurrentPage(Math.min(pageCount, currentPage + 1))
	}, [currentPage, pageCount]);


	const {
			register,
			handleSubmit,
			reset,
			formState: { errors },
		  } = useForm<FormDataCreate>({resolver: zodResolver(CadastroClienteSchema),});useForm<FormDataCreate>();
	
	const CadastrarCliente = async(data: FormDataCreate) => {
		setLoading(true)
	
		try{
			const token = localStorage.getItem('token');
			const retorno = await api.post('/clients', data,{
				headers: {
					"Content-Type": "application/json",					
					Authorization: token ? `Bearer ${token}` : '', // Adiciona o token se ele existir
					
				},
			});	

			reset({
				email: "",
				name: "",
				phone:"",
			});

			setLoading(false)
			toast.success(retorno.data.message);
			setisOPen(false)
			BuscarClientes()

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		}catch(error:any){
			setLoading(false)
			toast.error(error.response?.data?.message)
		}

	};

 

	const BuscarClientes = useCallback(async () => {
		const response = await GetAllClients();
		setClientes(response);	
	},[])

	useEffect(() =>{
		BuscarClientes()
	},[BuscarClientes])

	const handleAbrirModal  = (clientid: number) => {
		setIsModalUpdate(true)
		setClientId(clientid)
	}


	const handleFecharModal = () => {
		setIsModalUpdate(false);
	};

	const ExcluirCliente = async(clientId: number) => {
	
		try{
			const token = localStorage.getItem('token');
			const retorno = await api.delete(`/clients/${clientId}`,{
				headers: {
					"Content-Type": "application/json",					
					Authorization: token ? `Bearer ${token}` : '', // Adiciona o token se ele existir
					
				},
			});	

			
			toast.success(retorno.data.message);			
			BuscarClientes()

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		}catch(error:any){
			
			toast.error(error.response?.data?.message)
		}

	};



  	return (
		<>		

			<Breadcrumb pageName="Clientes" />	
			<div className="px-2 py-6 flex justify-end">
				<Button color="secondary" onClick={() => setisOPen(true)} >< Plus className="mr-0.5"/>Adicionar Cliente</Button>
				<Modal
                    isOpen={isOpen}
                    onClose={() => setisOPen(false)}
                    className="max-w-[500px] m-10 p-5"
                >
					<form onSubmit={handleSubmit(CadastrarCliente)} className="mt-6">
					<h1 className="font-bold text-2xl">Cadastro Cliente</h1>
						<div className="grid grid-cols-12 gap-2 py-4">
							<div className="col-span-12">
								<label htmlFor="name" className="block text-sm text-gray-800 dark:text-gray-200">Nome</label>
								<input {...register("name")} placeholder="Nome" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
								{errors.name && <p className="text-red-500">{errors.name.message}</p>}
							</div>
							<div className="col-span-12">
								<label htmlFor="email" className="block text-sm text-gray-800 dark:text-gray-200">E-mail</label>
								<input {...register("email")} placeholder="E-mail" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
								{errors.email && <p className="text-red-500">{errors.email.message}</p>}
							</div>
							<div className="col-span-12">
								<label htmlFor="phone" className="block text-sm text-gray-800 dark:text-gray-200">Celular</label>
								<input {...register("phone")} placeholder="Celular" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
								{errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
							</div>
							
						</div>
					
						<div className="flex items-center justify-end w-full gap-3 mt-4">
							<Button variant="destructive"  onClick={() => setisOPen(false)}>
								Fechar  
							</Button>							
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

			<div className="w-full  mx-auto bg-white p-6 shadow-md rounded-lg ">
				<div className="mb-4 flex justify-between items-center">
					<input
						type="text"
						placeholder="Buscar..."
						value={search}
						onChange={handleSearch}
						className="p-2 border border-gray-300 rounded"
					/>
				
				</div>

				{currentPageData.length > 0 ? (
					
					<table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg overflow-hidden">
						<thead className="bg-gray-100">
							<tr>
								{columns.map((column) => (							
									<th
										className="sortable p-3 text-left cursor-pointer text-black hover:text-gray-700"
										onClick={() => handleSort(column.key as keyof DataType)}
										>
											{column.label}
											{sortConfig.key === column.key && (
												<>
													{sortConfig.direction === "asc" ? (
														<ChevronUp className="inline ml-2" />
													) : (
														<ChevronDown className="inline ml-2" />
													)}
												</>
										)}
									
									</th>
								))}						
							</tr>
						</thead>
	
						<tbody>
						
							{currentPageData.map((row) => (
								<tr key={row.id} className="border-b hover:bg-gray-50">
									<td className="p-3">{row.id}</td>
									<td className="p-3">{row.name}</td>
									<td className="p-3">{row.email}</td>
									<td className="p-3">{row.phone || '----'}</td>
									<td className="p-3">{row.postalCode || '----'}</td>
									<td className="flex items-center p-3 gap-3">
										<div >
											<Button 
												variant="secondary" 
												onClick={() => handleAbrirModal(row.id)}  
												title="Editar"
											>
												<Edit />
											</Button>
											<EditarModal 
												clientid={clientId} 
												open={IsModalUpdate} 
												onClose={handleFecharModal} 
												buscarClientes={BuscarClientes}
											/>
										</div>
										<div>

											<Button 
												variant="destructive" 
												onClick={() => ExcluirCliente(row.id)}  
												title="Excluir"
											>
												<Trash2 />
											</Button>
										</div>
									</td>

								</tr>
	
							))}
							
						</tbody>
	
						
					</table>
				
			) : (
				<div className="flex items-center justify-center py-10">
						
						<Loader className="animate-spin mx-auto" width={50} height={50}/>

					</div>
				)
				
			}

			<div className="mt-2 flex justify-center items-center">
				<button
					onClick={onNextPage}
					className="text-gray-600 p-2 hover:bg-gray-100 rounded"
				>
					<ChevronLeft />
				</button>
				<span className="text-gray-600">
					Página {currentPage} de {pageCount}
				</span>
				<button
					onClick={onPreviousPage}
					className="text-gray-600 p-2 hover:bg-gray-100 rounded"
				>
					<ChevronRight />
				</button>
			</div>
		</div>
		
		</>
	
  );
};

export default Clientes;
