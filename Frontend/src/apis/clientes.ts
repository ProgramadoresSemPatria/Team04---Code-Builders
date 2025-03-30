import api from '@/services/Api';
import  {ClientesProps} from '../@types/clientes';
// import { decryptData } from '@/utils/criptografia';


export async function GetAllClients(): Promise<ClientesProps[] | []> {
    const token = localStorage.getItem('token');

    try {

     
        const response = await api.get('/clients', {
            headers: {
              Authorization: token ? `Bearer ${token}` : '', // Adiciona o token se ele existir
            },
        });

        return response.data
   
        
    } catch (error) {

		console.error("Erro ao buscar clientes:", error);
		return [ ]
    }
}





export async function GetDadosCliente(idcliente:number): Promise<ClientesProps> {
    const token = localStorage.getItem('token');

    try {

        const response = await api.get(`/clients/${idcliente}`,{
            headers: {
              Authorization: token ? `Bearer ${token}` : '', // Adiciona o token se ele existir
            },
          });        
        return response.data as ClientesProps; 
  

    }catch(err){   
        console.log(err)
        return {} as ClientesProps
    }
}
