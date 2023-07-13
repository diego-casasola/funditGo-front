import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DonacionModalComponent } from '../components/modals/donacion-modal/donacion-modal.component';

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

  openDonacionDialog(donacionMinima: number, proyectoId: string){
    this.dialog_config.data = {donacionMinima, proyectoId};
    this.dialog_config.height = 'auto';
    return this.dialog.open(DonacionModalComponent, this.dialog_config);
  }
}
