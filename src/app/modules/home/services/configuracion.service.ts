import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private baseUrl: string = environment.API_URL;
  
  constructor(
    private http: HttpClient,
  ) { }

  getRequerimientosTipo(id: string){
    const url = `${this.baseUrl}/configuracion/tipoProyecto/${id}`;
    return this.http.get<any>(url);
  }

  subirRequisito(data: any){
    let file: File = data.file;
    let fd = new FormData();
    fd.append('file', file);
    fd.append('requerimientoId', data.requerimientoId);
    fd.append('proyectoId', data.proyectoId);
    const url = `${this.baseUrl}/configuracion/proyecto/requisito`;
    return this.http.post<any>(url, fd);
  }
}
