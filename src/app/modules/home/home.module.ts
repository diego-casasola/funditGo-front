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
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ViewProyectoComponent } from './pages/proyectos/view-proyecto/view-proyecto.component';
import { DetallesProComponent } from './components/detalles-pro/detalles-pro.component';
import { ActualizacionesProComponent } from './components/actualizaciones-pro/actualizaciones-pro.component';
import { ComentariosProComponent } from './components/comentarios-pro/comentarios-pro.component';
import { GestionProyectosComponent } from './pages/proyectos/gestion-proyectos/gestion-proyectos.component';
import { DonacionModalComponent } from './components/modals/donacion-modal/donacion-modal.component';
import { PagoComponent } from './pages/pago/pago.component';
import { ProyectosRevisionComponent } from './pages/admin/proyectos-revision/proyectos-revision.component';
import { ComentarioModalComponent } from './components/modals/comentario-modal/comentario-modal.component';
import { ListaUsuariosComponent } from './pages/admin/lista-usuarios/lista-usuarios.component';
import { ListaProyectosUserComponent } from './pages/proyectos/lista-proyectos-user/lista-proyectos-user.component';
import { RequerimientosProyectoComponent } from './pages/proyectos/requerimientos-proyecto/requerimientos-proyecto.component';


@NgModule({
  declarations: [
    LandingComponent,
    ListaProyectosComponent,
    BuscadorComponent,
    ProyectosFilterComponent,
    ViewProyectoComponent,
    DetallesProComponent,
    ActualizacionesProComponent,
    ComentariosProComponent,
    GestionProyectosComponent,
    DonacionModalComponent,
    PagoComponent,
    ProyectosRevisionComponent,
    ComentarioModalComponent,
    ListaUsuariosComponent,
    ListaProyectosUserComponent,
    RequerimientosProyectoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
  ]
})
export class HomeModule { }
