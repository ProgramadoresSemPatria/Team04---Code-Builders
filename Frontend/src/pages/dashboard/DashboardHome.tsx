import { useAuthStore } from "../../store/useAuthStore";

export const DashboardHome = () => {
  const { authuser } = useAuthStore();

  return (
    <div className="py-10">
      
      <div className="flex flex-col gap-y-3">
          <div className="flex gap-3">
            <h1 className="font-bold text-2xl">Bem-vindo,{authuser?.name}</h1>
            <p className="p-1 rounded-3xl flex items-center justify-center relative -top-3 border-1 border-b-black text-[10px]">Plano {authuser?.serviceType}</p>
            
          </div>
          <p>Aqui está um resumo do seu negócio freelance</p>
           
      </div>
    </div>
  )
}


export default DashboardHome;