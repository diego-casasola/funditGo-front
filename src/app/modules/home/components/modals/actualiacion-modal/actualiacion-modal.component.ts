import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProyectoService } from '../../../services/proyecto.service';

@Component({
  selector: 'app-actualiacion-modal',
  templateUrl: './actualiacion-modal.component.html',
  styleUrls: ['./actualiacion-modal.component.scss']
})
export class ActualiacionModalComponent implements OnInit {

  descripcion!: string;

  constructor(
    public dialog_ref: MatDialogRef<ActualiacionModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { proyectoId: string, descripcion: string, ejecutorId: string },
    private authService: AuthService,
    private proyectoService: ProyectoService
  ) { }

  ngOnInit(): void {
  }

  addActualizacion(){
    this.data.descripcion = this.descripcion;
    this.proyectoService.addActualizacion(this.data).subscribe(
      (resp: any) => {
        this.dialog_ref.close();
      }
    );
  }

}
