import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-comentarios-pro',
  templateUrl: './comentarios-pro.component.html',
  styleUrls: ['./comentarios-pro.component.scss']
})
export class ComentariosProComponent implements OnInit {
  @Input('COMENTARIOS') comentarios!: any[];
  @Input('PROYECTO_ID') proyectoId!: string;
  @Input('IS_STAFF') is_staff!: boolean;
  @Output() comentariosActualizados = new EventEmitter<void>();

  constructor(
    private modalService: ModalService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    console.log('--------staf?----------');
    console.log(this.is_staff);
  }

  openComentar() {
    if (this.is_staff) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puedes comentar tu propio proyecto',
      })
      return;
    }
    if (this.authService.isLogged()) {
      const dialog = this.modalService.openComentarioDialog(this.proyectoId);
      dialog.afterClosed().subscribe(
        (resp) => {
          this.comentariosActualizados.emit();
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes iniciar sesión para comentar',
      })
    }
  }

}
