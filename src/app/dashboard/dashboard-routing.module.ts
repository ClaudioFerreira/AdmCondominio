import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/guard/auth.guard';

import { DashboardComponent } from './dashboard.component';
import { CasasComponent } from './../casas/casas.component';
import { CasasDetalhesComponent } from './../casas-detalhes/casas-detalhes.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'casas', component: CasasComponent },
      { path: 'casas/detalhes', component: CasasDetalhesComponent },
      {path: '**', redirectTo: 'login'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
