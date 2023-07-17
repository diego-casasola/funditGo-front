import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DonacionModalComponent } from '../donacion-modal/donacion-modal.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProyectoService } from '../../../services/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comentario-modal',
  templateUrl: './comentario-modal.component.html',
  styleUrls: ['./comentario-modal.component.scss']
})
export class ComentarioModalComponent implements OnInit {
  comentario!: string;

  constructor(
    public dialog_ref: MatDialogRef<ComentarioModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { proyectoId: string },
    private authService: AuthService,
    private proyectoService: ProyectoService
  ) { }

  ngOnInit(): void {
  }

  agregarComentario() {
    this.proyectoService.crearComentario(this.data.proyectoId, this.authService.currentUserId, this.comentario).subscribe(
      (resp) => {
        console.log(resp);
        this.dialog_ref.close(resp);
      },
      (err) => { console.log(err); });
  }
}
