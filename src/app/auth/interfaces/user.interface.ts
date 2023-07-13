export interface AuthResponse{
    jwt: string;
}

export interface User{
    user_id: string;
    nombre: string;
    username: string;
    is_staff: boolean;
    permisos: Permisos[];
}

export interface ShortUser{
    user_id: string;
    nombreCompleto: string;
    username: string;
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