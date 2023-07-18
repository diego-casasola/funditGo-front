export interface AuthResponse{
    jwt: string;
}

export interface User{
    user_id: string;
    nombre: string;
    username: string;
    is_staff: string;
    permisos: Permisos[];
}

export interface ShortUser{
    id: string;
    nombreCompleto: string;
    username: string;
}

export interface RUser{
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    fechaNacimiento: string;
    isAdmin: boolean;
    
}

export interface Permisos {
    ADMIN_SEC: string;
    ADMIN_PROYECTOS: string
    ADMIN_DONACIONES: string
    ADMIN_REQUISITOS: string
    CREATE_PROYECTOS: string
    CREATE_DONACIONES: string
    CREATE_COMENTARIOS: string
}

export interface Colaborador{
    id: string;
    usuario: ShortUser;
}