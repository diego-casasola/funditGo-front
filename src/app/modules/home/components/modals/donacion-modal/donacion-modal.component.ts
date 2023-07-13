import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProyectoService } from '../../../services/proyecto.service';

@Component({
  selector: 'app-donacion-modal',
  templateUrl: './donacion-modal.component.html',
  styleUrls: ['./donacion-modal.component.scss']
})
export class DonacionModalComponent implements OnInit {
  montoDonacion!: number;
  minDonacion!: number;
  userId!: string;
  constructor(
    public dialog_ref: MatDialogRef<DonacionModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { donacionMinima: number, proyectoId: string },
    private authService: AuthService,
    private proyectoService: ProyectoService
  ) { }

  getUser() {
    this.userId = this.authService.currentUserId;
  }

  ngOnInit(): void {
    this.getUser();
    this.minDonacion = this.data.donacionMinima;
    console.log(this.minDonacion);
  }

  donar() {
    this.proyectoService.crearDonacion(this.data.proyectoId, this.userId, this.montoDonacion).subscribe(
      (resp) => {
        console.log(resp);
        this.dialog_ref.close(resp);
      },
      (err) => { console.log(err);});
  }
}
