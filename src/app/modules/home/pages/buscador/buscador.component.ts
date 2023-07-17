import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../services/proyecto.service';
import { PageEvent } from '@angular/material/paginator';
import { Proyecto, ProyectoFavorito } from '../../interfaces/proyecto.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ConfiguracionService } from '../../services/configuracion.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {
  pageEvent!: PageEvent;
  lengthTable: number = 10;
  page: number = 1;
  pageSize: number = 25;
  pageSizeOptions: number[] = [10, 25, 35, 50];

  proyectosEncontrados: Proyecto[] = [];
  proyectosFavoritosUser: ProyectoFavorito[] = [];

  constructor(
    private proyectoService: ProyectoService,
    private authService: AuthService,
    private configService: ConfiguracionService
  ) { }

  ngOnInit(): void {
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

  buscar(event: any) {
    let data = {
      tipoProyectoId: event.category,
      titulo: event.search,
      fechaDesde: event.date_start,
      fechaHasta: event.date_end,
      donacionMinima: event.price_start,
      estado: 'Aceptado'
    }
    console.log(data)
    this.proyectoService.filterProyectosBuscador(this.page, this.pageSize, data).subscribe(
      (resp: any) => {
        console.log(resp);
        this.proyectosEncontrados = resp.items.map((proyecto: any, index: number) => ({
          ...proyecto,
          order: index
        }));
        this.proyectosEncontrados.forEach((proyecto: any) => {
          this.configService.requerimientosProyecto(proyecto.id).subscribe(
            (resp: any) => {
              resp.requisitos.forEach((requisito: any) => {
                if (requisito.requerimiento.nombre === 'Imagen' || requisito.requerimiento.nombre === 'ImagenPrincipal') {
                  proyecto.imagen = requisito.archivoId
                }
              });
            });
        });
      }
    );
  }

  getProyectosPage(page: number, pageSize: number) {
    this.proyectoService.getListaProyectosPag(page, pageSize).subscribe(
      (resp: any) => {
        this.proyectosEncontrados = resp.items.map((proyecto: any, index: number) => ({
          ...proyecto,
          order: index
        }));
        console.log(this.proyectosEncontrados);
        this.proyectosEncontrados.forEach((proyecto: any) => {
          this.configService.requerimientosProyecto(proyecto.id).subscribe(
            (resp: any) => {
              resp.requisitos.forEach((requisito: any) => {
                if (requisito.requerimiento.nombre === 'Imagen' || requisito.requerimiento.nombre === 'ImagenPrincipal') {
                  proyecto.imagen = requisito.archivoId
                }
              });
            });
        });
        console.log(this.proyectosEncontrados);
      }
    );
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
            }, (err) => {
              if (err.status === 400) {
                Swal.fire({
                  title: 'No se puede agregar a favoritos',
                  text: 'No se puede agregar a favoritos un proyecto propio',
                  icon: 'warning',
                  confirmButtonText: 'Aceptar'
                });
              }
            })
          ).subscribe();
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

  isProyectoFavorito(idProyecto: string): boolean {
    if (this.authService.isLogged()) {
      return this.proyectosFavoritosUser.some(proyecto => proyecto.proyecto.id === idProyecto);
    }
    return false
  }

}
