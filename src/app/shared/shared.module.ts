import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderPrincipalComponent } from './components/header-principal/header-principal.component';
import { FooterPrincipalComponent } from './components/footer-principal/footer-principal.component';
import { MaterialModule } from '../material/material.module';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  declarations: [
    HeaderPrincipalComponent,
    FooterPrincipalComponent
  ],
  exports: [
    HeaderPrincipalComponent,
    FooterPrincipalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule,
    MaterialModule,
    AutocompleteLibModule,
    ReactiveFormsModule,

  ],
  providers:[
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ]
})
export class SharedModule { }
