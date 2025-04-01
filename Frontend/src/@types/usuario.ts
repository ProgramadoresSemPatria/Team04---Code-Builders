// export interface UsuarioProps{
//     id               : number,
//     name             : string,
//     email            : string, 
//     serviceType      : string,
//     phone            : string,
//     address          : string,
//     city             : string,
//     neighborhood     : string,
//     postalCode       : string,
//     isEmailVerified  : boolean,
// }


export  interface AuthResponse {
    id: number;
    name: string;
    email: string;
    serviceType: string;
    phone: string | null;
    address: string | null;
    city: string | null;
    neighborhood: string | null;
    postalCode: string | null;
    isEmailVerified: boolean;
    isPaymentDone: boolean;
    projects :number;
    clients :number;
    timeEntries :number;
}

