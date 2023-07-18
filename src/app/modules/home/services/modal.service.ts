import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DonacionModalComponent } from '../components/modals/donacion-modal/donacion-modal.component';
import { ComentarioModalComponent } from '../components/modals/comentario-modal/comentario-modal.component';
import { ColaboradorModalComponent } from '../components/modals/colaborador-modal/colaborador-modal.component';
import { ActualiacionModalComponent } from '../components/modals/actualiacion-modal/actualiacion-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  dialog_config = new MatDialogConfig();

  constructor(
    private dialog: MatDialog
  ) {
    this.configDialog();
  }

  configDialog(
    disableClose: boolean = false,
    autoFocus: boolean = true,
    panelClass: string = 'my-dialog',
    data: null = null
  ): void {
    this.dialog_config.disableClose = disableClose;
    this.dialog_config.autoFocus = autoFocus;
    this.dialog_config.panelClass = panelClass;
    if (data) this.dialog_config.data = data;
  }

  openDialog(component: ComponentType<unknown>): MatDialogRef<unknown> {
    return this.dialog.open(component, this.dialog_config);
  }

  openDonacionDialog(donacionMinima: number, proyectoId: string) {
    this.dialog_config.data = { donacionMinima, proyectoId };
    this.dialog_config.height = 'auto';
    return this.dialog.open(DonacionModalComponent, this.dialog_config);
  }

  openComentarioDialog(proyectoId: string) {
    this.dialog_config.data = { proyectoId };
    this.dialog_config.height = 'auto';
    return this.dialog.open(ComentarioModalComponent, this.dialog_config);
  }

  openAddColaboradorDialog(proyectoId: string, userNameUsuario: string, ejecutorId: string) {
    this.dialog_config.data = { proyectoId, userNameUsuario, ejecutorId };
    this.dialog_config.height = 'auto';
    return this.dialog.open(ColaboradorModalComponent, this.dialog_config);
  }

  openAddActualizacionDialog(proyectoId: string, descripcion: string, ejecutorId: string) {
    this.dialog_config.data = { proyectoId, descripcion, ejecutorId };
    this.dialog_config.height = 'auto';
    return this.dialog.open(ActualiacionModalComponent, this.dialog_config);
  }
}
