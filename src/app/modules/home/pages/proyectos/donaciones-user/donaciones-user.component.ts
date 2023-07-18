import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { tap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { Donacion, Proyecto, ProyectoFavorito } from '../../../interfaces/proyecto.interface';
import { ConfiguracionService } from '../../../services/configuracion.service';
import { ProyectoService } from '../../../services/proyecto.service';

@Component({
  selector: 'app-donaciones-user',
  templateUrl: './donaciones-user.component.html',
  styleUrls: ['./donaciones-user.component.scss']
})
export class DonacionesUserComponent implements OnInit {

  imgUrl: string = '';
  listaDonaciones: Donacion[] = [];

  constructor(
    private proyectoService: ProyectoService,
    private authService: AuthService,
    private configService: ConfiguracionService
  ) { }

  ngOnInit(): void {
    this.getDonaciones(this.authService.currentUserId);
    
  }

  getDonaciones(userId: string) {
    this.proyectoService.donacionesUser(userId).subscribe(
      (resp: any) => {
        this.listaDonaciones = resp;
      }
    )
  }
}
