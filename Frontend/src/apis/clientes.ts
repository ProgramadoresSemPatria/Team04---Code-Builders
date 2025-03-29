import  {ClientesProps} from '../@types/clientes';


const data = [
	{ name: "João Silva", age: 29, city: "São Paulo",project : 1 },
	{ name: "Maria Oliveira", age: 34, city: "Rio de Janeiro",project : 1 },
	{ name: "Carlos Souza", age: 23, city: "Belo Horizonte",project : 1 },
	{ name: "Ana Costa", age: 25, city: "Curitiba",project : 1 },
	{ name: "Pedro Santos", age: 31, city: "Salvador",project : 1 },
	{ name: "Lucia Martins", age: 27, city: "Fortaleza",project : 1 },
	{ name: "Fernanda Lima", age: 35, city: "Recife",project : 1 },
	{ name: "Lucas Pereira", age: 30, city: "Porto Alegre",project : 1 },
	{ name: "Camila Rocha", age: 22, city: "Goiânia",project : 1 },
	{ name: "Bruna Alves", age: 28, city: "Manaus",project : 1 },
];

export async function GetAllClients(): Promise<ClientesProps[] | []> {

    try {
        // Simulação de chamada para API
        const response = data;
       


        return response
        
      } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            return [ ]
      }
}





// export async function GetDadosCliente(idcliente:number): Promise<ClientesProps> {

//     const token = await Getcookieserver()
//     const idempresa = await Getidempresaserver()
    
//     try {


//         const retorno = await api.get(`/clientes/listar/${idempresa}`, {         
//                 headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });


        
//         const filter = retorno.data.filter((item : ClientesProps) => {
//             return Number(item.idcliente) === Number(idcliente); 
//         })

        
//         return filter[0] as ClientesProps; 
  

//     }catch(err){   

//         console.log(err)
//         return {} as ClientesProps
//     }
// }
