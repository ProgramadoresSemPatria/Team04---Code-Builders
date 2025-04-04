import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarChart3, Eye, EyeOff, Loader } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginSchema = z.object({
    name: z.string().min(1, "Nome obrigatório"),
    email: z.string().email("Formato de e-mail inválido"),
    password: z.string().min(3, "Senha menor que 3 caracteres"),
    confirmPassword: z.string().min(3, "Senha menor que 3 caracteres"),
	serviceType: z.string().nonempty("O Tipo de serviço é obrigatório")
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],

});

type FormData = z.infer<typeof LoginSchema>;

const SignUp = () => {

	const navigate = useNavigate();
	const { isSigninUp ,signup} = useAuthStore();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(LoginSchema),
	});

	const onSubmit = async(data: FormData) => {
		const retorno = await signup(data)
		if(retorno){			
			navigate('/');
			return
		}
	};

	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center p-6 md:p-20 space-y-8">
			<div className="absolute  left-4 top-4 md:left-8 md:top-8">
				<Link to="/">
					<button type="button" className="flex items-center gap-1">
						<BarChart3 className="h-5 w-5" />
						<span className="font-bold">FreelancerCRM</span>
					</button>
				</Link>
			</div>

			<div className="w-full max-w-sm md:max-w-lg mt-10 px-6 py-8 bg-white rounded-lg shadow-md dark:bg-gray-800 space-y-6">
				<div className="text-center">
					<h1 className="text-2xl font-bold">Cadastrar-se</h1>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div>
						<label className="block text-sm text-gray-800 dark:text-gray-200">Nome</label>
						<input
							{...register("name")}
							placeholder="Nome"
							className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
						/>
						{errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
					</div>

					<div>
						<label className="block text-sm text-gray-800 dark:text-gray-200">E-mail</label>
						<input
							{...register("email")}
							placeholder="E-mail"
							className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
						/>
						{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
					</div>

					<div>
						<label className="block text-sm text-gray-800 dark:text-gray-200">Senha</label>
						<div className="relative">
							<input
								{...register("password")}
								placeholder="***************"
								className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
								type={showPassword ? "text" : "password"}
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 flex items-center pr-3"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
							</button>
						</div>
						{errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
					</div>

					<div>
						<label className="block text-sm text-gray-800 dark:text-gray-200">Confirmar Senha</label>
						<div className="relative">
							<input
								{...register("confirmPassword")}
								placeholder="***************"
								className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
								type={showConfirmPassword ? "text" : "password"}
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 flex items-center pr-3"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							>
								{showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
							</button>
						</div>
						{errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
					</div>

					<div>
						<label className="block text-sm text-gray-800 dark:text-gray-200">Tipo de Serviço</label>
						<select {...register("serviceType")} className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none">
							<option value="">Selecione tipo de serviço...</option>
							<option value="DEV">Desenvolvimento de Software</option>
							<option value="WEB">Desenvolvimento Web</option>
							<option value="DESIGN">Design Gráfico</option>
							<option value="SEO">SEO e Marketing Digital</option>
							<option value="COPY">Redação e Copywriting</option>
							<option value="VIDEO">Edição de Vídeo</option>
							<option value="MKT">Gestão de Mídias Sociais</option>
							<option value="CONSULT">Consultoria em Negócios</option>
							<option value="TRAD">Tradução e Legenda</option>
							<option value="SUPPORT">Suporte Técnico</option>
						</select>
						{errors.serviceType && <p className="text-red-500 text-sm">{errors.serviceType.message}</p>}
					</div>

					<div>
						<button
							className="w-full btn bg-[#18181B] text-white p-2 rounded-md text-center flex justify-center items-center"
							type="submit"
							disabled={isSigninUp}
						>
							{isSigninUp ? <Loader className="animate-spin" /> : "Cadastrar"}
						</button>
					</div>
				</form>

				<p className="text-md font-light text-center text-black">
					Já tem uma conta? {" "}
					<Link to="/signin" className="font-medium text-black dark:text-gray-200 hover:underline">
						Entrar
					</Link>
				</p>
			</div>
		</div>

	);
};

export default SignUp;
