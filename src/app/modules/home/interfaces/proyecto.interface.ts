import { ShortUser } from "src/app/auth/interfaces/user.interface";

export interface Proyecto{
    id: string;
    fechaCreacion: string;
    tipoProyecto: string;
    descripcion: string;
    titulo: string;
    estado: string;
    donacionMinima: number;
    porcentajeDonaciones: number;
    cantidadDonaciones: number;
}

export interface RProyecto{
    id: string;
    creador: ShortUser;
    tipo: TipoProyecto;
    fechaCreacion: string;
    estado: string;
    titulo: string;
    descripcion: string;
    historia: string;
    compromisoAmbiental: string;
    donacionEsperada: number;
    donacionRecibida: number;
    donacionMinima: number;
    porcentajeDonaciones: number;
    cantidadDonaciones: number;
    comentarios: any[];
    colaboradores: any[];
    donaciones: any[];
    actualizaciones: any[];
}

export interface CProyecto{
    creadorId: string;
    tipoproyectoId: string;
    titulo: string;
    descripcion: string;
    historia: string;
    compromisoAmbiental: string;
    donacionEsperada: number;
    donacionMinima: number;
}

export interface TipoProyecto{
    id: string;
    nombre: string;
}

export interface ProyectoFavorito{
    id: string;
    proyecto: Proyecto;
}