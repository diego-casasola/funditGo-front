import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../services/proyecto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent implements OnInit {
  user = this.authService.currentUserId;
  pagoId = this.activatedRoute.snapshot.params.pagoId;
  datosPago: any;
  imagen: any;

  constructor(
    private proyectoService: ProyectoService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private _sanitizer: DomSanitizer
  ) { }


  ngOnInit(): void {
    // obteniendo datos para el pago
    Swal.fire({
      title: 'Cargando...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.getPagoById();
        this.getQR();
      }
    });

  }

  getQR() {
    this.proyectoService.getQrPago(this.pagoId).subscribe(
      (resp: any) => {
        this.imagen = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + resp);
        Swal.close();
      },
      (err) => { console.log(err); }
    );
  }

  getPagoById() {
    this.proyectoService.getPagoById(this.pagoId).subscribe(
      (resp: any) => {
        this.datosPago = resp;
      },
      (err) => { console.log(err); }
    );
  }

  donar() {
    this.proyectoService.donar(this.pagoId).subscribe(
      (resp: any) => {
        window.location.href = '/';
      }
    );
  }
}
