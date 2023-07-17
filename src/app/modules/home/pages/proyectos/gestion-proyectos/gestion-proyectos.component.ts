import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProyectoService } from '../../../services/proyecto.service';
import Swal from 'sweetalert2';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-gestion-proyectos',
  templateUrl: './gestion-proyectos.component.html',
  styleUrls: ['./gestion-proyectos.component.scss']
})
export class GestionProyectosComponent implements OnInit {
  proyectoId: any;
  tipoProyectoId!: string;

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
    private activatedRoute: ActivatedRoute
  ) { 
  }

  ngOnInit(): void {
    this.proyectoId = this.activatedRoute.snapshot.paramMap.get('proyectoId');
    if (this.proyectoId) {
      this.getProyectoById();
      this.getTipoProyectoId();
    } else {
      this.getTipoProyectoId();
    }
  }

  getTipoProyectoId() {
    this.proyectoService.getTipoProyectos().subscribe(
      (resp: any) => {
        this.tiposProyecto = resp;
      },
      (err) => { console.log(err); }
    );
  }

  guardar(stepper: MatStepper) {
    if (this.formProyecto.invalid) {
      return;
    }
    Swal.fire({
      title: 'Creando proyecto',
      text: 'Espere por favor...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => {
          this.proyectoService.createProyecto(this.formProyecto.value).subscribe(
            (resp: any) => {
              Swal.close();
                stepper.next();
                  this.tipoProyectoId = this.formProyecto.controls.tipoproyectoId.value;
            },
            (_) => {
              Swal.close();
              Swal.fire('Error al crear el proyecto');
            }
          );
        }, 5000); // 5000 milisegundos = 5 segundos
      }
    });
  }

  getProyectoById() {
    this.proyectoService.getProyectoById(this.proyectoId).subscribe(
      (resp: any) => {
        this.formProyecto.patchValue(resp);
        // fill category
        this.formProyecto.controls.tipoproyectoId.setValue(resp.tipo.id);
        this.formProyecto.disable();
        this.tipoProyectoId = resp.tipo.id;
      },
      (err) => { console.log(err); }
    );
  }

  fillForm(proyecto: any) {
    this.formProyecto.patchValue(proyecto);
  }
}
