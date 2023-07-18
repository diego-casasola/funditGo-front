import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProyectoService } from '../../services/proyecto.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-actualizaciones-pro',
  templateUrl: './actualizaciones-pro.component.html',
  styleUrls: ['./actualizaciones-pro.component.scss']
})
export class ActualizacionesProComponent implements OnInit {
  @Input('ACTUALIZACIONES') actualizaciones!: any[];
  @Input('ISCOLABORADOR') isColaborador!: boolean;
  @Input('IS_STAFF') is_staff!: boolean;
  @Input('PROYECTO_ID') proyectoId!: string;
  @Output() comentariosActualizados = new EventEmitter<void>();

  descripcion: string = '';

  constructor(
    private proyectoService: ProyectoService,
    private authService: AuthService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    console.log(this.actualizaciones);
  }

  openAddActualizacionDialog() {
    let proyectoId = this.proyectoId;
    let userId = this.authService.currentUserId;
    let descripcion = this.descripcion;
    const modal = this.modalService.openAddActualizacionDialog(proyectoId, descripcion, userId);
    modal.afterClosed().subscribe(
      (resp: any) => {
        this.comentariosActualizados.emit();
      }
    );
  }
}
