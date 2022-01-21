import { CasasDetalhesComponent } from './../casas-detalhes/casas-detalhes.component';
import { DashboardComponent } from './dashboard.component';
import { CasasComponent } from './../casas/casas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'casas', component: CasasComponent },
      { path: 'casas/detalhes', component: CasasDetalhesComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
