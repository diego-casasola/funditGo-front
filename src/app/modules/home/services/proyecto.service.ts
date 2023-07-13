import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CProyecto, Proyecto, RProyecto } from '../interfaces/proyecto.interface';
import { Observable } from 'rxjs';
import { Paginacion } from '../interfaces/paginacion.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private baseUrl: string = environment.API_URL;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  createProyecto(proyecto: CProyecto): Observable<any> {
    const url = `${this.baseUrl}/proyecto`;
    const headers = {
      Authorization: `Bearer ${this.authService.accessToken}`,
    }
    return this.http.post<any>(url, proyecto, { headers });
  }

  getListaProyectos(): Observable<Proyecto[]> {
    const url = `${this.baseUrl}/proyecto/buscar/aceptado`;
    return this.http.get<Proyecto[]>(url);
  }

  getListaProyectosPag(page: number, size: number): Observable<Paginacion> {
    const url = `${this.baseUrl}/proyecto/buscar/aceptado?Page=${page}&PageSize=${size}`;
    return this.http.get<Paginacion>(url);
  }

  getProyectoById(id: string): Observable<RProyecto> {
    const url = `${this.baseUrl}/proyecto/${id}`;
    return this.http.get<RProyecto>(url);
  }

  agregarFavorito(id: string, userId: string) {
    const url = `${this.baseUrl}/usuario/favorito`;
    const body = {
      proyectoId: id,
      usuarioId: userId
    }
    return this.http.post<any>(url, body);
  }

  eliminarFavorito(id: string, userId: string) {
    const url = `${this.baseUrl}/usuario/favorito`;
    const body = {
      proyectoFavoritoId: id,
      usuarioId: userId
    }
    return this.http.delete<any>(url, { body });
  }

  crearDonacion(proyectoId: string, usuarioId: string, monto: number) {
    const url = `${this.baseUrl}/proyecto/donacion`;
    const body = {
      proyectoId,
      usuarioId,
      monto
    }
    // bearer token
    const headers = {
      Authorization: `Bearer ${this.authService.accessToken}`,
    }
    return this.http.post<any>(url, body, { headers });
  }

  getQrPago(id: string) {
    const url = `${this.baseUrl}/pago/image/qr/${id}`;
    return this.http.get<any[]>(url);
  }

  getPagoById(id: string) {
    const url = `${this.baseUrl}/pago/${id}`;
    return this.http.get<any>(url);
  }

  getTipoProyectos() {
    const url = `${this.baseUrl}/tipoProyecto`;
    return this.http.get<any[]>(url);
  }

  filterProyectos(page: number, size: number, data: any): Observable<Paginacion> {
    const url = `${this.baseUrl}/proyecto/buscar?Page=${page}&PageSize=${size}&estado=${data.estado}`;
    return this.http.get<Paginacion>(url);
  }

  aceptarProyecto(id: string) {
    const url = `${this.baseUrl}/proyecto/aceptar`;
    const headers = {
      Authorization: `Bearer ${this.authService.accessToken}`,
    }
    const data = {
      proyectoId: id
    }
    return this.http.put<any>(url, data, { headers });
  }

  donar(id: string){
    const url = `${this.baseUrl}/pago/${id}`;
    const data = {
      idPago: id
    }
    return this.http.put<any>(url, data);
  }
}