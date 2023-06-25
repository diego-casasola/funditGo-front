import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './modules/principal/principal.component';

const routes: Routes = [
  {
    path:'',
    component: PrincipalComponent,
    loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule)
  },
  {
    path:'auth',
    component: PrincipalComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
