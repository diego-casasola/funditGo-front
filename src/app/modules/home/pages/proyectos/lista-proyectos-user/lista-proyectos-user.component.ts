import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProyectoService } from '../../../services/proyecto.service';
import { Proyecto } from '../../../interfaces/proyecto.interface';
import { Router } from '@angular/router';
import { ConfiguracionService } from '../../../services/configuracion.service';

@Component({
  selector: 'app-lista-proyectos-user',
  templateUrl: './lista-proyectos-user.component.html',
  styleUrls: ['./lista-proyectos-user.component.scss']
})
export class ListaProyectosUserComponent implements OnInit {
  listaProyectos: Proyecto[] = [];
  listaProyectosColaboracion: Proyecto[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private proyectoService: ProyectoService,
    private configService: ConfiguracionService
  ) { }

  ngOnInit(): void {
    this.getProyectos();
    this.getProyectosColaborador();
  }

  getProyectos() {
    this.proyectoService.proyectosCreador(this.authService.currentUserId).subscribe(
      (resp) => {
        console.log(resp);
        this.listaProyectos = resp;
        this.listaProyectos.forEach((proyecto: any) => {
          this.configService.requerimientosProyecto(proyecto.id).subscribe(
            (resp: any) => {
              resp.requisitos.forEach((requisito: any) => {
                if (requisito.requerimiento.nombre === 'Imagen' || requisito.requerimiento.nombre === 'ImagenPrincipal') {
                  if (requisito.archivoId){
                    proyecto.imagen = 'https://localhost:7120/api/configuracion/file/'+requisito.archivoId;
                  } else {
                    
                  }
                }
              });
            });
        });
      },
      (err) => { console.log(err); });
  }

  getEstadoStyles(estado: string) {
    let color = '';
  
    switch (estado) {
      case 'Borrador':
        color = 'blue';
        break;
      case 'Revision':
        color = 'purple';
        break;
      case 'Observacion':
        color = 'orange';
        break;
      case 'Aceptado':
        color = 'green';
        break;
      case 'Rechazado':
        color = 'red';
        break;
      default:
        color = '';
        break;
    }
  
    return { color: color };
  }

  verProyecto(proyecto: Proyecto) {
    if (proyecto.estado === 'Borrador') {
      this.router.navigate(['proyecto/editar/', proyecto.id]);
    }
    if (proyecto.estado === 'Revision' || proyecto.estado === 'Aceptado') {
      this.router.navigate(['proyecto/', proyecto.id]);
    }
  }

  getProyectosColaborador() {
    this.proyectoService.proyectosColaborador(this.authService.currentUserId).subscribe(
      (resp) => {
        console.log(resp);
        this.listaProyectosColaboracion = resp;
        this.listaProyectosColaboracion.forEach((proyecto: any) => {
          this.configService.requerimientosProyecto(proyecto.id).subscribe(
            (resp: any) => {
              resp.requisitos.forEach((requisito: any) => {
                if (requisito.requerimiento.nombre === 'Imagen' || requisito.requerimiento.nombre === 'ImagenPrincipal') {
                  if (requisito.archivoId){
                    proyecto.imagen = 'https://localhost:7120/api/configuracion/file/'+requisito.archivoId;
                  } else {
                    
                  }
                }
              });
            });
        });
      },
      (err) => { console.log(err); });
  }
  
}
