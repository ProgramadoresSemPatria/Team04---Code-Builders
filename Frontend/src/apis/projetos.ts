import { ProjetosProps } from "@/@types/projetos";

enum Status {
    PLANNING = "PLANNING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    PENDING_PAYMENT = "PENDING_PAYMENT",
    OVERDUE = "OVERDUE"
}
   
const projetos: ProjetosProps[] = [
    { userId: 1,id: 1, name: "Projeto A", clientId: 1, status: Status.PLANNING, price: 10000 },
    { userId: 2,id: 2, name: "Projeto B", clientId: 2, status: Status.IN_PROGRESS, price: 20000 },
    { userId: 1,id: 3, name: "Projeto C", clientId: 3, status: Status.COMPLETED, price: 30000 },
    { userId: 3,id: 4, name: "Projeto D", clientId: 4, status: Status.PENDING_PAYMENT, price: 40000 },
    { userId: 1,id: 5, name: "Projeto E", clientId: 5, status: Status.OVERDUE, price: 50000 },
    { userId: 4,id: 6, name: "Projeto F", clientId: 6, status: Status.PLANNING, price: 60000 },
    { userId: 1,id: 7, name: "Projeto G", clientId: 7, status: Status.IN_PROGRESS, price: 70000 },
    { userId: 5,id: 8, name: "Projeto H", clientId: 8, status: Status.COMPLETED, price: 80000 },
    { userId: 1,id: 9, name: "Projeto I", clientId: 9, status: Status.PENDING_PAYMENT, price: 90000 },
    { userId: 1,id: 10, name: "Projeto J", clientId: 10, status: Status.OVERDUE, price: 100000 }
  ];

export async function GetAllProjetos(): Promise<ProjetosProps[] | []> {

    try {
        const userId = Number(localStorage.getItem('id'));
        const retorno = projetos.filter((item) => item.userId === userId );   
        return retorno
        
    }catch (error) {
        console.error("Erro ao buscar projetos:", error);
        return [ ]
    }
}

export async function GetDadosProjeto(id:number): Promise<ProjetosProps> {

    try {
        const retorno = projetos.find((item) => item.id === id);   
        return retorno as ProjetosProps; 
  

    }catch(err){   
        console.log(err)
        return {} as ProjetosProps
    }
}
