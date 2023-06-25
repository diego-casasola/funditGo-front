import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingComponent } from './pages/landing/landing.component';
import { ListaProyectosComponent } from './pages/proyectos/lista-proyectos/lista-proyectos.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { BuscadorComponent } from './pages/buscador/buscador.component';
import { ProyectosFilterComponent } from './components/proyectos-filter/proyectos-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LandingComponent,
    ListaProyectosComponent,
    BuscadorComponent,
    ProyectosFilterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
