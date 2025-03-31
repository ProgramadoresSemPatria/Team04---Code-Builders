import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import api from "@/services/Api";
import { useAuthStore } from "../../store/useAuthStore";
import { decryptData, encryptData } from "@/utils/criptografia";
import { AuthResponse } from "@/@types/usuario";


const Payment = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
    const [status, setStatus] = useState<"default" | "sucesso">("default");
    const { authuser, setUser } = useAuthStore();

 	useEffect(() => {
		// Obter o parâmetro 'session_id' da URL
		const params = new URLSearchParams(window.location.search);
		const sessionId = params.get("session_id");

		if (sessionId) {
		// Se há session_id, estamos na rota de sucesso e precisamos verificar o pagamento
		const verifyPayment = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					setError("Token não encontrado. Faça login novamente.");
					setLoading(false);
					return;
				}

				const response = await api.get(`/verify-payment?session_id=${sessionId}`, {
					headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
					},
				});

				console.log("Resposta da API:", response.data);

				if (response.data.success) {
					// Se a verificação for bem-sucedida e o usuário estiver autenticado
					if (authuser) {
					console.log("authuser antes:", authuser);
					const updatedAuthuser: AuthResponse = { ...authuser, isPaymentDone: true };

					// Atualiza o localStorage com o usuário atualizado
					localStorage.setItem("AuthResponse", encryptData(updatedAuthuser));
					const storedAuthData = localStorage.getItem("AuthResponse");
					const userData: AuthResponse | null = storedAuthData ? decryptData(storedAuthData) : null;
					if (userData) {
						setUser(userData);
						console.log("authuser atualizado:", userData);
					}
					}
					setStatus("sucesso");

					// Redireciona para o dashboard após 2 segundos
					setTimeout(() => {
					window.location.href = "/dashboard";
					}, 2000);
				} else {
					setError("Erro ao verificar pagamento.");
				}
			} catch (err) {
				console.error("Erro ao verificar pagamento:", err);
				setError("Erro ao processar o pagamento.");
			} finally {
				setLoading(false);
			}
		};

		verifyPayment();
		} else {
     	 	// Se não há session_id, buscamos a URL de pagamento
			const fetchPaymentUrl = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					setError("Token de autenticação não encontrado.");
					setLoading(false);
					return;
				}

				const response = await api.post(
					"/payment",
					{},
					{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					}
				);

				if (response.data?.url) {
					console.log("URL de pagamento recebida:", response.data.url);
					setPaymentUrl(response.data.url);
				} else {
					throw new Error("Nenhuma URL de pagamento foi retornada.");
				}
			} catch (err) {
				console.error("Erro ao buscar URL de pagamento:", err);
				setError("Erro ao obter a URL de pagamento.");
			} finally {
				setLoading(false);
			}
		};

			fetchPaymentUrl();
   		}
  }, [authuser, setUser]);

	// Renderizar carregamento
	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-100">
				<Loader2 className="h-16 w-16 animate-spin text-primary" />
			</div>
		);
	}

	// Renderizar mensagem de erro, se houver
	if (error) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-100">
				<p className="text-red-600 font-bold">{error}</p>
			</div>
		);
	}

  // Se a verificação do pagamento foi concluída com sucesso, mostra mensagem de sucesso e redirecionamento
	if (status === "sucesso") {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gradient-to-t from-slate-900 to-slate-700">
				<div className="bg-white shadow-lg rounded-lg p-6 w-[500px] text-center">
					<div className="text-2xl font-bold">Pagamento Aprovado</div>
					<div className="mt-2 text-gray-700">
						Seu pagamento foi processado com sucesso! Redirecionando para o dashboard...
					</div>
				</div>
			</div>
		);
	}


  return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-t from-slate-900 to-slate-700">
			<div className="bg-white shadow-lg rounded-lg p-6 w-[500px] text-center">
				{paymentUrl ? (
					<>
						<p className="text-gray-700 text-lg font-semibold">
							Clique no botão abaixo para concluir o pagamento.
						</p>
						<button
							onClick={() => window.open(paymentUrl, "_blank")}
							className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
							>
							Ir para pagamento
						</button>
					</>
					) : (
						<p className="text-gray-600">
							Ainda estamos processando sua solicitação de pagamento.
						</p>
					)
				}
			</div>
		</div>
  	);
};

export default Payment;
