import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProyectoService } from '../../../services/proyecto.service';
import { Proyecto } from '../../../interfaces/proyecto.interface';

@Component({
  selector: 'app-lista-proyectos-user',
  templateUrl: './lista-proyectos-user.component.html',
  styleUrls: ['./lista-proyectos-user.component.scss']
})
export class ListaProyectosUserComponent implements OnInit {
  listaProyectos: Proyecto[] = [];

  constructor(
    private authService: AuthService,
    private proyectoService: ProyectoService
  ) { }

  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos() {
    this.proyectoService.proyectosCreador(this.authService.currentUserId).subscribe(
      (resp) => {
        console.log(resp);
        this.listaProyectos = resp;
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
  
}
