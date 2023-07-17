import { Component, Input, OnInit } from '@angular/core';
import { ConfiguracionService } from '../../services/configuracion.service';
import { Requisito, Requisitos } from '../../interfaces/proyecto.interface';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-documentacion-proyecto',
  templateUrl: './documentacion-proyecto.component.html',
  styleUrls: ['./documentacion-proyecto.component.scss']
})
export class DocumentacionProyectoComponent implements OnInit {
  @Input('PROYECTOID') proyectoId!: string;
  @Input('NOMBREPROYECTO') nombreProyecto!: string;
  @Input('ESTADOPROYECTO') estadoProyecto!: string;
  listaDocumentacion!: Requisitos;

  user = this.authService.usuario;
  constructor(
    private docService: ConfiguracionService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getDocumentacion();
  }

  getDocumentacion() {
    this.docService.requerimientosProyecto(this.proyectoId).subscribe(
      (resp) => {
        this.listaDocumentacion = resp;
        console.log(this.listaDocumentacion);
      },
      (err) => { console.log(err); });
  }

  ver(archivo: Requisito) {
    // swal mostrando el archivo
    Swal.fire({
      title: archivo.requerimiento.nombre,
      text: 'Archivo',
      imageUrl: 'https://localhost:7120/api/configuracion/file/' + archivo.archivoId,
      imageWidth: 400,
      imageAlt: 'Custom image',
    })

  }

  descargar(archivo: Requisito) {
    let imgUrl = 'https://localhost:7120/api/configuracion/file/' + archivo.archivoId;
    const nombre = archivo.requerimiento.nombre.toLowerCase();
    fetch(imgUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = nombre + '-' + this.nombreProyecto;
        link.click();
        window.URL.revokeObjectURL(url);
      });
  }

  eliminar(idRequisito: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          proyectoId: this.proyectoId,
          requisitoProyectoId: idRequisito
        }
        this.docService.deleteRequisitoProyecto(data).subscribe(
          (resp) => {
            Swal.fire(
              'Eliminado',
              'El requisito ha sido eliminado',
              'success'
            )
            this.getDocumentacion();
          },
          (err) => { console.log(err); });
      }
    })
  }

}
