import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../../services/proyecto.service';
import { AuthService } from '../../../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RProyecto } from '../../../interfaces/proyecto.interface';
import { ModalService } from '../../../services/modal.service';
import Swal from 'sweetalert2';
import { ConfiguracionService } from '../../../services/configuracion.service';

@Component({
  selector: 'app-view-proyecto',
  templateUrl: './view-proyecto.component.html',
  styleUrls: ['./view-proyecto.component.scss']
})
export class ViewProyectoComponent implements OnInit {
  proyectoId = this.activatedRoute.snapshot.params.proyectoId;

  proyecto!: RProyecto;

  user = this.authService.usuario;
  imgUrl = '';

  constructor(
    private proyectoService: ProyectoService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private route: Router,
    private configService: ConfiguracionService
  ) {

  }

  async ngOnInit(): Promise<void> {
    this.obtenerImagen();
    await this.getProyecto();
    console.log(this.isCreador());
  }

  async getProyecto(): Promise<void> {
    try {
      this.proyecto = await this.proyectoService.getProyectoById(this.proyectoId).toPromise();
    } catch (err) {
      console.log(err);
    }
  }

  openDonation() {
    if (this.isCreador()) {
      Swal.fire(
        'Error',
        'No puedes donar a tu propio proyecto',
        'error'
      );
      return;
    }

    if (this.authService.isLogged()) {
      const dialog = this.modalService.openDonacionDialog(this.proyecto.donacionMinima, this.proyectoId);
      dialog.afterClosed().subscribe(
        (resp) => {
          if (resp) {
            this.route.navigate(['/pago/pasarela/' + resp]);
          }
        }
      );
    } else {
      Swal.fire(
        'Error',
        'Debes iniciar sesión para poder donar',
        'error'
      );
    }
  }

  aceptarProyecto() {
    Swal.fire({
      title: '¿Estás seguro de aceptar este proyecto?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00A7E1',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.proyectoService.aceptarProyecto(this.proyectoId).subscribe(
          (resp: any) => {
            Swal.fire(
              'Proyecto aceptado',
              'El proyecto ha sido aceptado exitosamente',
              'success'
            );
            this.route.navigate(['proyectos/revision']);
          },
          (err) => {
            Swal.fire(
              'Error',
              'Ha ocurrido un error al aceptar el proyecto',
              'error'
            );
          }
        );
      }
    })
  }

  actualizarComentarios() {
    this.getProyecto();
  }

  rechazarProyecto() {
    Swal.fire({
      title: '¿Estás seguro de rechazar este proyecto?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00A7E1',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.proyectoService.rechazarProyecto(this.proyectoId).subscribe(
          (resp: any) => {
            Swal.fire(
              'Proyecto rechazado',
              'El proyecto ha sido rechazado exitosamente',
              'success'
            );
            this.route.navigate(['proyectos/revision']);
          },
          (err) => {
            Swal.fire(
              'Error',
              'Ha ocurrido un error al rechazar el proyecto',
              'error'
            );
          }
        );
      }
    })
  }

  isCreador() {
    return this.user.user_id == this.proyecto.creador.id;
  }

  isLogged() {
    return this.authService.isLogged();
  }

  obtenerImagen() {
    this.configService.requerimientosProyecto(this.proyectoId).subscribe(
      (resp: any) => {
        resp.requisitos.forEach((req: any) => {
          if (req.requerimiento.nombre === 'Imagen' || req.requerimiento.nombre === 'ImagenPrincipal') {
            this.imgUrl = req.archivoId;
          }
        });
      }
    );
  }
}
