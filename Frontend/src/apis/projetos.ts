import { ProjetosProps } from "@/@types/projetos";
import api from "@/services/Api";


export async function GetAllProjetos(): Promise<ProjetosProps[] | []> {
    const token = localStorage.getItem('token');
    try {
        const response = await api.get('/projects', {
            headers: {
              Authorization: token ? `Bearer ${token}` : '', // Adiciona o token se ele existir
            },
        });

        return response.data 
        
    }catch (error) {
        console.error("Erro ao buscar projetos:", error);
        return [ ]
    }
}

export async function GetDadosProjeto(id:number): Promise<ProjetosProps> {
    const token = localStorage.getItem('token');
    try {

        const response = await api.get(`/projects/${id}`,{
            headers: {
              Authorization: token ? `Bearer ${token}` : '', // Adiciona o token se ele existir
            },
        });        

        return response.data as ProjetosProps; 
  

    }catch(err){   
        console.log(err)
        return {} as ProjetosProps
    }
}
