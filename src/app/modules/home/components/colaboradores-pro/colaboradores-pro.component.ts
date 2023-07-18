import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Colaborador, ShortUser } from 'src/app/auth/interfaces/user.interface';
import { ProyectoService } from '../../services/proyecto.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-colaboradores-pro',
  templateUrl: './colaboradores-pro.component.html',
  styleUrls: ['./colaboradores-pro.component.scss']
})
export class ColaboradoresProComponent implements OnInit {
  @Input('COLABORADORES') colaboradores!: Colaborador[];
  @Input('PROYECTO_ID') proyectoId!: string;
  @Output() comentariosActualizados = new EventEmitter<void>();

  constructor(
    private proyectoService: ProyectoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  eliminarColaborador(colaborador: Colaborador) {
    let data = {
      proyectoId: this.proyectoId,
      colaboradorId: colaborador.id,
      ejecutorId: this.authService.currentUserId
    }
    // estas seguro que quieres eliminar este colaborador?
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar a ${colaborador.usuario.nombreCompleto} de este proyecto`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      this.proyectoService.eliminarColaborador(data).subscribe(
        (resp: any) => {
          this.comentariosActualizados.emit();
        }
      );
    });
  }

}
