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

// {
//     "id": "ca569b62-fd8a-491f-a889-5cdbe230a811",
//     "creador": {
//       "id": "054ea1e9-0621-ee11-92b7-347df62baef2",
//       "nombreCompleto": "Diego Casasola",
//       "userName": "diegoCasasola"
//     },
//     "tipo": {
//       "id": "a3f0acfc-6fbc-4d19-83fd-ec3b75d5f6d9",
//       "nombre": "Tecnología"
//     },
//     "fechaCreacion": "2023-07-12T23:27:27.4521282",
//     "estado": "Aceptado",
//     "titulo": "Proyecto 1 test",
//     "descripcion": "proyecto de primera prueba",
//     "historia": "Este proyecto se creó para probar",
//     "compromisoAmbiental": "Este proyecto se creó para probar",
//     "donacionEsperada": 500,
//     "donacionRecibida": 0,
//     "donacionMinima": 10,
//     "porcentajeDonaciones": 0,
//     "cantidadDonaciones": 0,
//     "comentarios": [],
//     "colaboradores": [],
//     "donaciones": [],
//     "actualizaciones": []
//   }

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