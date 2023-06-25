import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { BuscadorComponent } from './pages/buscador/buscador.component';

const routes: Routes = [{
  path: '',
  component: LandingComponent,
},
{
  path: 'proyectos',
  component: BuscadorComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
