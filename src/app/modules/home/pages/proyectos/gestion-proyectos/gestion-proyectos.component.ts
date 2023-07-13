import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProyectoService } from '../../../services/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-proyectos',
  templateUrl: './gestion-proyectos.component.html',
  styleUrls: ['./gestion-proyectos.component.scss']
})
export class GestionProyectosComponent implements OnInit {
  userId = this.authService.currentUserId;
  formProyecto = this.fb.group({
    creadorId: [this.userId],
    tipoproyectoId: ['', Validators.required],
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    historia: ['', Validators.required],
    compromisoAmbiental: ['', Validators.required],
    donacionEsperada: ['', Validators.required],
    donacionMinima: ['', Validators.required],
  });

  tiposProyecto: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private proyectoService: ProyectoService,
  ) { }

  ngOnInit(): void {
    this.getTipoProyectoId();
  }

  getTipoProyectoId() {
    this.proyectoService.getTipoProyectos().subscribe(
      (resp: any) => {
        this.tiposProyecto = resp;
      },
      (err) => { console.log(err); }
    );
  }

  guardar() {
    if (this.formProyecto.invalid) {
      return;
    }
    Swal.fire({
      title: 'Creando proyecto',
      text: 'Espere por favor...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.proyectoService.createProyecto(this.formProyecto.value).subscribe(
          (resp: any) => {
            Swal.close();
            setTimeout(() => {
              this.route.navigate(['/proyectos/view/' + resp.id]);
            }, 500);
          },
          (_) => {
            Swal.close();
            Swal.fire('Error al crear el proyecto')
          }
        );
      }
    })
  }
}
