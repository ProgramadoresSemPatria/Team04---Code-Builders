import React, { useState,useCallback, useEffect} from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight ,Plus} from "lucide-react";
import { Button } from "@/components/ui/button"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { GetAllClients } from "@/apis/clientes";
import { ClientesProps } from "@/@types/clientes";
import { Modal } from "@/components/Modal/Modal";

type DataType = { name: string; age: number; city: string; project: number };

const columns: { key: keyof DataType | "action"; label: string }[] = [
	{ key: "name", label: "Nome" },
	{ key: "age", label: "Idade" },
	{ key: "city", label: "Cidade" },
	{ key: "project", label: "Projeto" },
	{ key: "action", label: "Ação" }, // Coluna para ações, mas não vai nos dados
];


const CadastroClienteSchema = z.object({
	email: z.string().email("Formato de e-mail inválido"),
	name: z.string().nonempty('Nome obrigatório'),
	phone: z.string().nonempty('Celular obrigatório'),
});

type FormDataCreate = z.infer<typeof CadastroClienteSchema>;

// const AtualizarCliente = z.object({
// 	email: z.string().email("Formato de e-mail inválido"),
// 	name: z.string().nonempty('Nome obrigatório'),
// 	phone: z.string().nonempty('Celular obrigatório'),
// 	address: z.string().nonempty('Celular obrigatório').optional().nullable(),
// });

// type FormDataUpdate = z.infer<typeof AtualizarCliente>;


const Clientes = () => {
	
	const [clientes,setClientes] = useState<ClientesProps[]>([])
	const [isOpen,setisOPen] = useState<boolean>(false)
	const [search, setSearch] = useState("");
	const [sortConfig, setSortConfig] = useState<{ key: keyof DataType; direction: "asc" | "desc" }>({
		key: "name",
		direction: "asc",
	  });
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
		setCurrentPage(1); // Reset to page 1 when searching
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
			item.city.toLowerCase().includes(search.toLowerCase())
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
			formState: { errors },
		  } = useForm<FormDataCreate>({resolver: zodResolver(CadastroClienteSchema),});useForm<FormDataCreate>();
	
		const CadastrarCliente = async(data: FormDataCreate) => {
			// try{

			// 	console.log(data)

			// }catch(error){

			// 	toast.error(error?.response?.data?.message)
			// }
			console.log(data)
			toast.success('Cadastro realizado com sucesso');
		};



		// const {
		// 	register : registreUpdate,
		// 	handleSubmit: handleSubmitUpdate,
		// 	formState: { errors: errosUpdate },
		// 	reset,
		//   } = useForm<FormDataUpdate>({resolver: zodResolver(AtualizarCliente),
		// 	defaultValues: {  // Valores iniciais opcionais
		// 		email: "",
		// 		name: "",
		// 		phone: "",
		// 		address: "",
		// 	  },
		//   });useForm<FormDataUpdate>();
	
	

		//   useEffect(() => {
		// 	async function fetchData() {
		// 	  try {
		// 		// Simulação de chamada para API
		// 		const response = await fetch("https://api.example.com/user/1");
		// 		const data = await response.json();
		
		// 		// Atualizando o formulário com os novos dados
		// 		reset({
		// 		  email: data.email || "",
		// 		  name: data.name || "",
		// 		  phone: data.phone || "",
		// 		  address: data.address || "",
		// 		});
		// 	  } catch (error) {
		// 		console.error("Erro ao buscar dados:", error);
		// 	  }
		// 	}
		
		// 	fetchData();
		//   }, [reset]); 

	const BuscarClientes = useCallback(async () => {
	

		const response = await GetAllClients();
		setClientes(response);

		
	},[])

	useEffect(() =>{
		BuscarClientes()
	},[BuscarClientes])



  	return (

		<>
			
			<div className="px-2 py-6 flex justify-end">
				<Button color="secondary" onClick={() => setisOPen(true)} >< Plus className="mr-0.5"/>Adicionar Cliente</Button>
				<Modal
                    isOpen={isOpen}
                    onClose={() => setisOPen(false)}
                    className="max-w-[500px] m-10 p-5 lg:p-10"
                >
					<form onSubmit={handleSubmit(CadastrarCliente)} className="mt-6">
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
								<label htmlFor="phone" className="block text-sm text-gray-800 dark:text-gray-200">E-mail</label>
								<input {...register("phone")} placeholder="E-mail" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
								{errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
							</div>
							
						</div>

					
						<div className="flex items-center justify-end w-full gap-3 mt-8">
							<Button variant="destructive"  onClick={() => setisOPen(false)}>
								Fechar  
							</Button>							
							<Button type="submit">Save changes</Button>
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
								<td className="p-3">{row.name}</td>
								<td className="p-3">{row.age}</td>
								<td className="p-3">{row.city}</td>
								<td className="p-3">{row.project}</td>
								<td className="p-3">
									{/* <Dialog>
										<DialogTrigger asChild>
											<Button onClick={() => handleEdit(cliente)}><Edit size={16} /></Button>
										</DialogTrigger>
										<DialogContent>
											<form onSubmit={handleSubmit(onSubmit)}>
											<label>Nome</label>
											<input {...register("name")} className="block w-full p-2 border rounded" />
											{errors.name && <p className="text-red-500">{errors.name.message}</p>}
											<label>Idade</label>
											<input type="number" {...register("age", { valueAsNumber: true })} className="block w-full p-2 border rounded" />
											{errors.age && <p className="text-red-500">{errors.age.message}</p>}
											<label>Cidade</label>
											<input {...register("city")} className="block w-full p-2 border rounded" />
											{errors.city && <p className="text-red-500">{errors.city.message}</p>}
											<label>Projeto</label>
											<input type="number" {...register("project", { valueAsNumber: true })} className="block w-full p-2 border rounded" />
											{errors.project && <p className="text-red-500">{errors.project.message}</p>}
											<DialogFooter>
												<Button type="submit">Salvar</Button>
											</DialogFooter>
											</form>
										</DialogContent>
									</Dialog> */}
									<button className="text-red-500 hover:text-red-700 ml-2">Excluir</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			

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
