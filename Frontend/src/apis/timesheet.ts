import { TimeSheetProps } from "@/@types/timesheet";
import api from "@/services/Api";


export async function GetAllTimeSheet(): Promise<TimeSheetProps[] | []> {
    const token = localStorage.getItem('token');
    try {
        const response = await api.get('/time-entries', {
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