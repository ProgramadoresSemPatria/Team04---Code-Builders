import React, { useState,useCallback, useEffect} from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight ,Plus, Edit, Loader, Trash2} from "lucide-react";
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Modal } from "@/components/Modal/Modal";
import { EditarModal } from "./EditarModal";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import { ProjetosProps } from "@/@types/projetos";
import { GetAllProjetos } from "@/apis/projetos";
import { FormataReal } from "@/lib/FormataReal";
import { GetAllClients } from "@/apis/clientes";
import { ClientesProps } from "@/@types/clientes";
import api from "@/services/Api";

type DataType = { id: number,name: string; clientId: number; status: string;price:number; };

const columns: { key: keyof DataType | "action"; label: string }[] = [
	{ key: "id", label: "#ID" },	
	{ key: "name", label: "Projeto" },	
	{ key: "clientId", label: "Client" },	
	{ key: "status", label: "Status" },
	{ key: "price", label: "Preço" },
	{ key: "action", label: "Ação" }, // Coluna para ações, mas não vai nos dados
];

const Schema = z.object({
	name: z.string().min(1, "Nome obrigatório"),
	clientId: z.string().min(1, "Escolha um cliente").transform((val) => Number(val)),
	price: z.string().min(1, "Digite um preço").transform((val) => Number(val)),
  });

type FormDataCreate = z.infer<typeof Schema>;


const Projetos = () => {

	const [loading,setLoading] = useState<boolean>(false)
	const [projects,setProjects] = useState<ProjetosProps[]>([])
	const [clients,setClients] = useState<ClientesProps[]>([])
	const [isOpen,setisOPen] = useState<boolean>(false)
	const [IsModalUpdate,setIsModalUpdate] = useState<boolean>(false)
	const [projectId,setProjectId] = useState<number>(0)
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

	const filteredData = projects.filter((item) => {
		return (
			item.name.toLowerCase().includes(search.toLowerCase()) ||
			item.status.toLowerCase().includes(search.toLowerCase())
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
		  } = useForm<FormDataCreate>({resolver: zodResolver(Schema),});useForm<FormDataCreate>();
	
	const CadastrarProjeto = async(data: FormDataCreate) => {

		setLoading(true)
		try{

			
			const token = localStorage.getItem('token');
			const retorno = await api.post(`/projects`,data,{
				headers: {
					"Content-Type": "application/json",					
					Authorization: token ? `Bearer ${token}` : '', // Adiciona o token se ele existir
					
				},
			});	

			setLoading(false)
			if(retorno){

				reset({
					name: "",
					clientId: 0,
					price:0
				});
	
				toast.success(retorno.data.message);
				setisOPen(false)
				BuscarProjetos()
			}


		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		}catch(error:any){
			setLoading(false)
			toast.error(error.response?.data?.message)
		}



	};

	const BuscarClientes = useCallback(async () => {
		const response = await GetAllClients();
		setClients(response);	
	},[])


	const BuscarProjetos = useCallback(async () => {
		const response = await GetAllProjetos();
		setProjects(response);	
	},[])

	useEffect(() =>{
		BuscarClientes()
		BuscarProjetos()
	},[BuscarProjetos,BuscarClientes])

	const handleAbrirModal  = (clientid: number) => {
		setIsModalUpdate(true)
		setProjectId(clientid)
	}


	const handleFecharModal = () => {
		setIsModalUpdate(false);
	};

	const ExcluirProjeto = async(projectId: number) => {
	
		try{
			const token = localStorage.getItem('token');
			const retorno = await api.delete(`/projects/${projectId}`,{
				headers: {
					"Content-Type": "application/json",					
					Authorization: token ? `Bearer ${token}` : '', // Adiciona o token se ele existir
					
				},
			});	

			
			toast.success(retorno.data.message);	
			BuscarProjetos()

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		}catch(error:any){
			
			toast.error(error.response?.data?.message)
		}

	};

  	return (
		<>		

			<Breadcrumb pageName="Projetos" />	
			<div className="px-2 py-6 flex justify-end">
				<Button color="secondary" onClick={() => setisOPen(true)} >< Plus className="mr-0.5"/>Adicionar Projeto</Button>
				<Modal
                    isOpen={isOpen}
                    onClose={() => setisOPen(false)}
                    className="max-w-[500px] m-10 p-5 "
                >
					<form onSubmit={handleSubmit(CadastrarProjeto)} className="mt-6">
					<h1 className="font-bol text-2xl">Cadastro Projeto</h1>
						<div className="grid grid-cols-12 gap-2 py-4">
							<div className="col-span-12">
								<label htmlFor="name" className="block text-sm text-gray-800 dark:text-gray-200">Nome</label>
								<input {...register("name")} placeholder="Nome do Projeto" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
								{errors.name && <p className="text-red-500">{errors.name.message}</p>}
							</div>
							<div className="col-span-12">
								<label htmlFor="email" className="block text-sm text-gray-800 dark:text-gray-200">Cliente</label>
								<select {...register("clientId")}	className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
									<option value="">Selecione...</option>
									{clients.map((client) => (
										<option key={client.id} value={client.id}>
											{client.name}
										</option>
									))}
									
								</select>
								{errors.clientId && <p className="text-red-500">{errors.clientId.message}</p>}
							</div>
							<div className="col-span-12">
								<label htmlFor="phone" className="block text-sm text-gray-800 dark:text-gray-200">Preço</label>
								<input {...register("price")} placeholder="Preço" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
								{errors.price && <p className="text-red-500">{errors.price.message}</p>}
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
						{currentPageData.map((row, index) => (
							<tr key={index} className="border-b hover:bg-gray-50">
								<td className="p-3">{row.id}</td>
								<td className="p-3">{row.name}</td>
								<td className="p-3">{row.clientId}</td>
								<td className="p-3">{row.status || '----'}</td>
								<td className="p-3">{FormataReal(row.price)}</td>
								<td className="flex items-center p-3 gap-3">
									<Button variant="secondary" onClick={() => handleAbrirModal(row.id)}  title="Editar">< Edit /></Button>
									<EditarModal 
										projectId={projectId} 
										open={IsModalUpdate} 
										onClose={handleFecharModal} 
										buscarProjetos={BuscarProjetos}
										/>
									
									<div>

											<Button 
												variant="destructive" 
												onClick={() => ExcluirProjeto(row.id)}  
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

export default Projetos;
