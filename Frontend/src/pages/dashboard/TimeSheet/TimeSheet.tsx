"use client"

import { useCallback, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs"

import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { ProjetosProps } from "@/@types/projetos"
import { GetAllProjetos } from "@/apis/projetos"

const Schema = z.object({
    projectId: z.preprocess((val) => Number(val), z.number().min(1, "Selecione o projeto")),
	date: z.string({
		required_error: "Selecione uma data.",
	}),
	duration: z.coerce
	  .number({required_error: "Digite a horas.",
	}).positive("Horas tem que ser positiva.")
	  .max(24, "horas não podem exceder 24 por dia."),
	description: z.string()
	  .min(5, "Descrição tem que ter pelo menos 5 caracteres.")
	  .max(500, "Descrição não pode exceder 500 caracteres."),
});

// Inferindo os tipos com base no schema Zod
type FormSchema = z.infer<typeof Schema>;


export default function TimesheetForm() {

	const [projects,setProjects] = useState<ProjetosProps[]>([])
	
	const BuscarProjetos = useCallback(async () => {
		const response = await GetAllProjetos();
		setProjects(response);	
	},[])

	useEffect(() =>{

		BuscarProjetos()
	},[BuscarProjetos])


  const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	  } = useForm<FormSchema>({resolver: zodResolver(Schema),});useForm<FormSchema>()

  function onSubmit(data: FormSchema) {
	console.log(data)
	reset({
		projectId: 0,
		date: "",
		duration: 0,
		description: "",
	});
    toast.custom((t) => (
		<div
		  className={`${
			t.visible ? 'animate-enter' : 'animate-leave'
		  } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
		>
		  <div className="flex-1 w-0 p-4">
			<div className="flex items-start">
			  <div className="flex-shrink-0 pt-0.5">
				<img
				  className="h-10 w-10 rounded-full"
				  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
				  alt=""
				/>
			  </div>
			  <div className="ml-3 flex-1">
				<p className="text-sm font-medium text-gray-900">
				  Emilia Gates
				</p>
				<p className="mt-1 text-sm text-gray-500">
				  Sure! 8:30pm works great!
				</p>
			  </div>
			</div>
		  </div>
		  <div className="flex border-l border-gray-200">
			<button
			  onClick={() => toast.dismiss(t.id)}
			  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
			>
			  Close
			</button>
		  </div>
		</div>
	  ))

  

  }

  return (
	<>
	
		<Breadcrumb pageName="Timesheet"/>
		<div className="min-h-screen ">
			<div className="max-w-full mx-auto">				
				<div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">				
					<div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
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
										<p className="text-xs text-gray-500">Total: {40} horas</p>
									</div>
								</div>
								<div className="h-4 w-48 bg-gray-200 rounded-full overflow-hidden">
									<div
										className="h-full bg-blue-600 rounded-full"
										// style={{ width: `${Math.min((weeklyHours / 40) * 100, 100)}%` }}
									></div>
								</div>
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
									<input {...register("date")} type="date" placeholder="Horas" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
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
								<Button type="submit">Gravar</Button>
							</div>
						
						</form>
					</div>
				</div>
				

			
			</div>

     
    	</div>
	
	</>
  )
}

