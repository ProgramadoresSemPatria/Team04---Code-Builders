import  {ClientesProps} from '../@types/clientes';


const data = [
	{ id:1,name: "João Silva", age: 29, city: "São Paulo",project : 1 },
	{ id:2,name: "Maria Oliveira", age: 34, city: "Rio de Janeiro",project : 1 },
	{ id:3,name: "Carlos Souza", age: 23, city: "Belo Horizonte",project : 1 },
	{ id:4,name: "Ana Costa", age: 25, city: "Curitiba",project : 1 },
	{ id:5,name: "Pedro Santos", age: 31, city: "Salvador",project : 1 },
	{ id:6,name: "Lucia Martins", age: 27, city: "Fortaleza",project : 1 },
	{ id:7,name: "Fernanda Lima", age: 35, city: "Recife",project : 1 },
	{ id:8,name: "Lucas Pereira", age: 30, city: "Porto Alegre",project : 1 },
	{ id:9,name: "Camila Rocha", age: 22, city: "Goiânia",project : 1 },
	{ id:10,name: "Bruna Alves", age: 28, city: "Manaus",project : 1 },
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





export async function GetDadosCliente(idcliente:number): Promise<ClientesProps> {

    try {

		const retorno = data.find((item) => item.id === idcliente);
   
        return retorno as ClientesProps; 
  

    }catch(err){   
        console.log(err)
        return {} as ClientesProps
    }
}
