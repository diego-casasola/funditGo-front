import { Component, Input, OnInit } from '@angular/core';
import { ConfiguracionService } from '../../../services/configuracion.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Requisito, Requisitos } from '../../../interfaces/proyecto.interface';

@Component({
  selector: 'app-requerimientos-proyecto',
  templateUrl: './requerimientos-proyecto.component.html',
  styleUrls: ['./requerimientos-proyecto.component.scss']
})
export class RequerimientosProyectoComponent implements OnInit {
  @Input('TIPOPROYECTOID') tipoProyectoId!: string;
  @Input('PROYECTOID') proyectoId!: string;
  listaRequerimientosSubidos: Requisito[] = [];

  formReq = this.fb.group({
    requerimiento: this.fb.array([]),
  });

  requerimientos(): FormArray {
    return this.formReq.get("requerimiento") as FormArray
  }

  constructor(
    private confiService: ConfiguracionService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.requerimientosSubidos();
    this.waitForTipoProyectoId();
  }

  waitForTipoProyectoId() {
    if (!this.tipoProyectoId) {
      setTimeout(() => {
        this.waitForTipoProyectoId();
      }, 500); // Puedes ajustar el tiempo de espera según tus necesidades
    } else {
      this.getRequerimientos();
    }
  }

  onFileChange(event: any, index: number) {
    const files: File = event.target.files[0];
    this.requerimientos().at(index).get('file')?.setValue(files);
  }

  getFileName(file: File | null): string {
    if (file) {
      return file.name;
    } else {
      return 'Subir archivo';
    }
  }

  getRequerimientos() {
    this.confiService.getRequerimientosTipo(this.tipoProyectoId).subscribe(
      (resp) => {
        resp.requerimientos.forEach((element: any) => {
          this.requerimientos().push(this.fb.group({
            file: File,
            requerimientoId: [element.requerimiento.id],
            proyectoId: [this.proyectoId],
            nombreReq: [element.requerimiento.nombre],
            obligatorio: [element.obligatorio],
          }));
        });
        console.log(this.formReq.value);
      }, (err) => { console.log(err); }
    );
  }
  subir() {
    Swal.fire({
      title: 'Subiendo archivos...',
      text: 'Por favor espere...',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.formReq.value.requerimiento.forEach((element: any) => {
      let data = {
        file: element['file'],
        requerimientoId: element['requerimientoId'],
        proyectoId: element['proyectoId'],
      }
      console.log(data);
      this.confiService.subirRequisito(data).subscribe(
        (resp) => {
          Swal.close();
          console.log(resp);
        }, (err) => {
          console.log(err);
          Swal.close();
        }
      );
    });
  }

  validarRequerimientoSubido(requerimiento: AbstractControl): boolean {
    console.log(requerimiento.value.nombreReq);
    const nombreReq = requerimiento.value.nombreReq;
    console.log(this.listaRequerimientosSubidos);
    return this.listaRequerimientosSubidos.some((element: any) => element.requerimiento.nombre === nombreReq);
  }



  requerimientosSubidos() {
    this.confiService.requerimientosProyecto(this.proyectoId).subscribe(
      (resp) => {
        this.listaRequerimientosSubidos = resp.requisitos;
        console.log(this.listaRequerimientosSubidos);
      },
      (err) => { console.log(err); });
  }
}
