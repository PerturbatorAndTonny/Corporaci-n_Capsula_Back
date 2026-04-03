export interface User {
    id: number;
    name: string;
    age: number;
    idrol: string;
    authType: "FACIAL" | "DNA_HUMAN";
    state: boolean; 
    failed_attempts: number; 
    pass: string;
}

export const usersDB: User[] = [];
