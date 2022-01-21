import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CasasComponent } from './../casas/casas.component';
import { CasasDetalhesComponent } from './../casas-detalhes/casas-detalhes.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CasasComponent,
    CasasDetalhesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
