"use client"

import { useCallback, useEffect, useState } from "react"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Loader } from "lucide-react"
import toast from "react-hot-toast"
import { ProjetosProps } from "@/@types/projetos"
import { GetAllProjetos } from "@/apis/projetos"
import api from "@/services/Api"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TimeSheetProps } from "@/@types/timesheet";
import { GetAllTimeSheet } from "@/apis/timesheet"
import { formataData } from "@/utils/formatadata"

const Schema = z.object({
    projectId: z.preprocess((val) => Number(val), z.number().min(1, "Selecione o projeto")),
	
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Selecione uma data"),
	duration: z.coerce
	  .number({required_error: "Digite a horas.",
	}).positive("Horas tem que ser positiva.")
	  .max(24, "horas não podem exceder 24 por dia."),
	description: z.string()
	  .min(5, "Descrição tem que ter pelo menos 5 caracteres.")
	  .max(500, "Descrição não pode exceder 500 caracteres."),
});


type FormSchema = z.infer<typeof Schema>;
const TimeSheet = () => {

	const [projects,setProjects] = useState<ProjetosProps[]>([])
	const [loading,setLoading] = useState<boolean>(false)
	const [showExamples, setShowExamples] = useState(true)
	const [timesheets,setTimesheets] = useState<TimeSheetProps[]>([])


	const BuscarHoras = useCallback(async () => {
		const response = await GetAllTimeSheet();
		setTimesheets(response);	
	},[])

	const BuscarProjetos = useCallback(async () => {
		const response = await GetAllProjetos();
		setProjects(response);	
	},[])

	useEffect(() =>{
		BuscarHoras()
		BuscarProjetos()
	},[BuscarProjetos,BuscarHoras])


	const totalhoras = timesheets.reduce((total, item) => total + item.duration, 0);



	const {
		register,
		handleSubmit,
		reset,
	formState: { errors },
	} = useForm<FormSchema>({resolver: zodResolver(Schema),});useForm<FormSchema>();

  	const onSubmit = async(data: FormSchema) =>{
		setLoading(true)
		try{
			
			const token = localStorage.getItem('token');

			const formattedData = {
				...data,
				date: new Date(data.date).toISOString(), // Converte para ISO 8601
			};
		
			const retorno = await api.post('/time-entries', formattedData,{
				headers: {
					"Content-Type": "application/json",					
					Authorization: token ? `Bearer ${token}` : '', 
					
				},
			});	


			reset({
				projectId: 0,
				date: "",
				duration: 0,
				description: "",
			});
			setLoading(false)
			toast.success(retorno.data.message);
			BuscarHoras()

	  	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	  	}catch(error:any){
			setLoading(false)
			toast.error(error.response?.data?.message)
		}

	}


  

  return (
	<>
	
		<Breadcrumb pageName="Timesheet"/>
		<div className="min-h-screen ">
			<div className="max-w-full mx-auto">				
				<div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">				
					<div className=" bg-gradient-to-t from-slate-900 to-slate-700 px-6 py-4">
						<h1 className="text-xl font-bold text-white">Timesheet</h1>
						<p className="text-blue-100 text-sm mt-1">Registre suas horas trabalhadas em um projeto</p>
					</div>

					<div className="px-6 py-6">
						{/* Weekly Hours Summary */}
						<div className="mb-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
							<h2 className="text-sm font-medium text-blue-800 mb-2">Total Horas Digitadas</h2>
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
										{/* <span className="text-blue-600 font-bold">{formatHours(weeklyHours)}</span> */}
									</div>
									<div className="ml-3">								
										<p className="text-xs text-gray-500">Total: {totalhoras} horas</p>
									</div>
								</div>
								{/* <div className="h-4 w-48 bg-gray-200 rounded-full overflow-hidden">
									<div
										className="h-full bg-blue-600 rounded-full"
										// style={{ width: `${Math.min((weeklyHours / 40) * 100, 100)}%` }}
									></div>
								</div> */}
							</div>
						</div>

						
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
							<div className="grid grid-cols-12 gap-3">
								<div className="col-span-12 sm:col-span-4">
									<label htmlFor="project" className="block text-sm font-medium text-gray-700">
										Projeto
									</label>
									<select {...register("projectId")}	className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
										<option value="">Selecione...</option>
										{projects.map((project) => (
											<option key={project.id} value={project.id}>
												{project.name}
											</option>
										))}
											
									</select>								
									{errors.projectId && <p className="mt-1 text-sm text-red-600">{errors.projectId.message}</p>}
								</div>
								<div className="col-span-12 sm:col-span-4">
									
										<label htmlFor="duration"  className="block text-sm text-gray-800 dark:text-gray-200">Horas</label>
										<input {...register("duration")} type="number" placeholder="Horas" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
										{errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
														
									
								</div>
								<div className="col-span-12 sm:col-span-4">
									<label htmlFor="date"  className="block text-sm text-gray-800 dark:text-gray-200">Data</label>
									<input 
										{...register("date")} 
										type="date" 
										placeholder="Data e Hora" 
										className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
									/>
									{errors.date && <p className="text-red-500">{errors.date.message}</p>}														
								</div>
								<div className="col-span-12 pt-4">
									<label htmlFor="description" className="block text-sm font-medium text-gray-700">
										Descrição
									</label>
									<textarea
										id="description"
										rows={4}
										placeholder="Ex: Implementado uma nova funcionalidade..."
										className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
										{...register("description")}
									>

									</textarea>
								
									{errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
								</div>
							</div>
						
							<div className="flex justify-end">
								<Button type="submit" 	disabled={loading}>							
									{loading ? (
										<Loader className="animate-spin" />
									) : (
										"Gravar"
									)}
                        		</Button>	
							</div>
						
						</form>
					</div>
				</div>
				

			
			</div>


			<div className="w-full bg-white rounded-lg shadow-md overflow-hidden mb-6">
				<div className="flex justify-between items-center px-6 py-3 bg-gray-50 border-b">
					<h2 className="text-sm font-medium text-gray-700">Horas Recentes</h2>
					<button
						type="button"
						className="text-xs text-blue-600 hover:text-blue-800"
						onClick={() => setShowExamples(!showExamples)}
						>
						{showExamples ? <EyeOff /> :<Eye /> } 
					</button>
				</div>

				{showExamples && (
					<div className="divide-y divide-gray-200">
					{timesheets.map((item, index) => (
						<div key={index} className="px-6 py-4">
						<div className="flex justify-between items-start">
							<div>
							<h3 className="text-sm font-medium text-gray-800">{item.project.name}</h3>
							<p className="text-xs text-gray-500">{formataData(String(item.date))}</p>
							</div>
								<div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
								{item.duration} hrs
								</div>
							</div>
							<p className="mt-2 text-sm text-gray-600">Descrição: {item.description}</p>
							</div>
						))}
						</div>
				)}
			</div>

     
    	</div>
	
	</>
  )
}



export default TimeSheet;