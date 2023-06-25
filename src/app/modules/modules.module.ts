import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@NgModule({
  declarations: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ModulesRoutingModule,
    MaterialModule,
    SharedModule
  ],
  providers:[
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }
  ]
})
export class ModulesModule { }
