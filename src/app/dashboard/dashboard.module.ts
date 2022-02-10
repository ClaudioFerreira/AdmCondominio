import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMaskModule } from 'ngx-mask';

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
    DashboardRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class DashboardModule { }
