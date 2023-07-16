import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class LandingComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    console.log(this.authService.usuario);
  }

  crearProyecto() {
    if(this.authService.isLogged()){      
      if (this.authService.usuario.is_staff === 'True'){
        Swal.fire({
          title: 'Estas en una cuenta de usuario Administrador',
          text: "No puedes crear proyectos",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })
        return
      }
      this.route.navigate(['create/proyecto']);
    } else {
      Swal.fire({
        title: 'No estas logueado',
        text: "Debes iniciar sesion para crear un proyecto",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
    }
  }

}
