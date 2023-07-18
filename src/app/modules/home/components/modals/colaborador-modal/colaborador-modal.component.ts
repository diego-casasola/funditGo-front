import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProyectoService } from '../../../services/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-colaborador-modal',
  templateUrl: './colaborador-modal.component.html',
  styleUrls: ['./colaborador-modal.component.scss']
})
export class ColaboradorModalComponent implements OnInit {
  userName!: string;

  constructor(
    public dialog_ref: MatDialogRef<ColaboradorModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { proyectoId: string, userNameUsuario: string, ejecutorId: string },
    private authService: AuthService,
    private proyectoService: ProyectoService
  ) { }

  ngOnInit(): void {
  }

  addColaborador() {
    this.data.userNameUsuario = this.userName;
    this.proyectoService.addColaborador(this.data).subscribe(
      (resp: any) => {
        this.dialog_ref.close();
      }, (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al agregar usuario',
        });
      }
    );
  }
}
