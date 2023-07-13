import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './modules/principal/principal.component';
import { CurrentUserResolver } from './shared/resolvers/current-user.resolver';
// import { resolve } from 'dns';

const routes: Routes = [
  {
    path:'',
    component: PrincipalComponent,
    loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule),
    resolve: {
      currentUser: CurrentUserResolver
    }
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
