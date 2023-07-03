import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { BuscadorComponent } from './pages/buscador/buscador.component';
import { ViewProyectoComponent } from './pages/proyectos/view-proyecto/view-proyecto.component';
import { GestionProyectosComponent } from './pages/proyectos/gestion-proyectos/gestion-proyectos.component';

const routes: Routes = [{
  path: '',
  component: LandingComponent,
},
{
  path: 'proyectos',
  component: BuscadorComponent,
},
{
  path: 'proyecto/:id',
  component: ViewProyectoComponent,
},
{
  path: 'create/proyecto',
  component: GestionProyectosComponent,
},
{
  path: '**',
  redirectTo: '',
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
