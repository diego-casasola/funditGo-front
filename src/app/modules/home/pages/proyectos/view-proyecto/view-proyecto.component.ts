import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../../services/proyecto.service';
import { AuthService } from '../../../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RProyecto } from '../../../interfaces/proyecto.interface';
import { ModalService } from '../../../services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-proyecto',
  templateUrl: './view-proyecto.component.html',
  styleUrls: ['./view-proyecto.component.scss']
})
export class ViewProyectoComponent implements OnInit {
  proyectoId = this.activatedRoute.snapshot.params.proyectoId;

  proyecto!: RProyecto;

  user = this.authService.usuario;

  constructor(
    private proyectoService: ProyectoService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private route: Router
  ) { }

  ngOnInit(): void {
    console.log(this.proyectoId);
    this.getProyecto();
  }

  getProyecto() {
    this.proyectoService.getProyectoById(this.proyectoId).subscribe(
      (resp: any) => {
        this.proyecto = resp;
        console.log(this.proyecto);
      },
      (err) => { }
    );
  }

  openDonation() {
    console.log(this.proyecto.donacionMinima);
    const dialog = this.modalService.openDonacionDialog(this.proyecto.donacionMinima, this.proyectoId);
    dialog.afterClosed().subscribe(
      (resp) => {
        if (resp) {
          this.route.navigate(['/pago/pasarela/' + resp]);
        }
      }
    );
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
    }).then((result: any ) => {
      if (result.isConfirmed) {
        this.proyectoService.aceptarProyecto(this.proyectoId).subscribe(
          (resp: any) => {
            Swal.fire(
              'Proyecto aceptado',
              'El proyecto ha sido aceptado exitosamente',
              'success'
            );
            this.route.navigate(['proyecto/revision']);
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

}
