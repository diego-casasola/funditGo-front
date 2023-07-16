import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Proyecto, ProyectoFavorito, RProyecto } from '../../../interfaces/proyecto.interface';
import { ProyectoService } from '../../../services/proyecto.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { map, switchMap, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-proyectos',
  templateUrl: './lista-proyectos.component.html',
  styleUrls: ['./lista-proyectos.component.scss']
})
export class ListaProyectosComponent implements OnInit {
  @Input('SEARCH') listaProyectosBuscados: Proyecto[] = [];

  pageEvent!: PageEvent;
  lengthTable: number = 10;
  page: number = 1;
  pageSize: number = 25;
  pageSizeOptions: number[] = [10, 25, 35, 50];

  listaProyectos: Proyecto[] = [];
  proyectosFavoritosUser: ProyectoFavorito[] = [];

  constructor(
    private proyectoService: ProyectoService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    // this.getProyectos();
    this.getProyectosPage(this.page, this.pageSize);
    if (this.authService.isLogged()) {
      this.getListaFavoritosUsuario().subscribe();
    }
  }

  onPaginateChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getProyectosPage(this.page, this.pageSize);
  }

  saveFavorite(idProyecto: string) {
    if (this.authService.isLogged()) {
      const proyectoIndex = this.proyectosFavoritosUser.findIndex(proyecto => proyecto.proyecto.id === idProyecto);
      if (proyectoIndex !== -1) {
        const proyectoId = this.proyectosFavoritosUser[proyectoIndex].id;
        const userId = this.authService.currentUserId;
        this.proyectoService.eliminarFavorito(proyectoId, userId)
          .pipe(
            tap(() => {
              this.proyectosFavoritosUser.splice(proyectoIndex, 1);
            })
          )
          .subscribe();
      } else {
        const proyectoId = idProyecto;
        const userId = this.authService.currentUserId;
        this.proyectoService.agregarFavorito(proyectoId, userId)
          .pipe(
            tap(() => {
              this.getListaFavoritosUsuario().subscribe();
            })
          )
          .subscribe();
      }
    } else {
      Swal.fire({
        title: 'Debe iniciar sesión',
        text: 'Para poder agregar a favoritos debe iniciar sesión',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }



  isProyectoFavorito(idProyecto: string): boolean {
    if (this.authService.isLogged()) {
      return this.proyectosFavoritosUser.some(proyecto => proyecto.proyecto.id === idProyecto);
    }
    return false
  }

  getProyectosPage(page: number, pageSize: number) {
    this.proyectoService.getListaProyectosPag(page, pageSize).subscribe(
      (resp: any) => {
        console.log(resp);
        this.listaProyectos = resp.items.map((proyecto: any, index: number) => ({
          ...proyecto,
          order: index
        }));
      }
    );
  }

  getListaFavoritosUsuario() {
    return this.authService.getUserById(this.authService.currentUserId).pipe(
      map((resp: any) => {
        const proyectosFavoritos = resp.proyectosFavoritos || [];
        this.proyectosFavoritosUser = proyectosFavoritos.map((proyecto: any, index: number) => ({
          ...proyecto,
          order: index
        }));
        return proyectosFavoritos;
      })
    );
  }
}
