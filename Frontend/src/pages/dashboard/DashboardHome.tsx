import { useAuthStore } from "../../store/useAuthStore";

export const DashboardHome = () => {
  const { authuser } = useAuthStore();

  return (
    <div className="py-10">
      
      <div className="flex flex-col gap-y-3">
          <div className="flex gap-3">
            <h1 className="font-bold text-2xl">Bem-vindo,{authuser?.name}</h1>
            {/* <p className="p-1 rounded-3xl flex items-center justify-center relative -top-3 border-1 border-b-black text-[10px]">Plano {authuser?.serviceType}</p> */}
            
          </div>
          <p>Aqui está um resumo do seu negócio freelance</p>
           
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {/* Card de Clientes */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold mb-2">Clientes</h2>
        <p className="text-4xl font-bold text-blue-600">{authuser?.clients}</p>
        <p className="text-gray-500">Clientes ativos</p>
      </div>
      
      {/* Card de Projetos */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold mb-2">Projetos</h2>
        <p className="text-4xl font-bold text-green-600">{authuser?.projects}</p>
        <p className="text-gray-500">Projetos em andamento</p>
      </div>
      
      {/* Card de Horas Digitadas */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold mb-2">Horas Digitadas</h2>
        <p className="text-4xl font-bold text-purple-600">{authuser?.projects}</p>
        <p className="text-gray-500">Horas registradas neste mês</p>
      </div>
    </div>
    </div>
  )
}


export default DashboardHome;