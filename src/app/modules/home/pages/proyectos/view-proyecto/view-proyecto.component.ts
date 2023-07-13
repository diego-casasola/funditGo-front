import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../../services/proyecto.service';
import { AuthService } from '../../../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RProyecto } from '../../../interfaces/proyecto.interface';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-view-proyecto',
  templateUrl: './view-proyecto.component.html',
  styleUrls: ['./view-proyecto.component.scss']
})
export class ViewProyectoComponent implements OnInit {
  proyectoId = this.activatedRoute.snapshot.params.proyectoId;

  proyecto!: RProyecto;

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

  getProyecto(){
    this.proyectoService.getProyectoById(this.proyectoId).subscribe(
      (resp: any) => {
        this.proyecto = resp;
        console.log(this.proyecto);
      },
      (err) => {}
    );
  }

  openDonation(){
    console.log(this.proyecto.donacionMinima);
    const dialog = this.modalService.openDonacionDialog(this.proyecto.donacionMinima, this.proyectoId);
    dialog.afterClosed().subscribe(
      (resp) => {
        if (resp){
          this.route.navigate(['/pago/pasarela/'+ resp]);
        }
      }
    );
  }

}
