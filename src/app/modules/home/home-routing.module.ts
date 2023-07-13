import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { BuscadorComponent } from './pages/buscador/buscador.component';
import { ViewProyectoComponent } from './pages/proyectos/view-proyecto/view-proyecto.component';
import { GestionProyectosComponent } from './pages/proyectos/gestion-proyectos/gestion-proyectos.component';
import { PagoComponent } from './pages/pago/pago.component';
import { ProyectosRevisionComponent } from './pages/admin/proyectos-revision/proyectos-revision.component';

const routes: Routes = [{
  path: '',
  component: LandingComponent,
},
{
  path: 'proyectos',
  component: BuscadorComponent,
},
{
  path: 'proyecto/:proyectoId',
  component: ViewProyectoComponent,
},
{
  path: 'create/proyecto',
  component: GestionProyectosComponent,
},
{
  path: 'pago/pasarela/:pagoId',
  component: PagoComponent,
},
{
  path: 'proyectos/revision',
  component: ProyectosRevisionComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
