import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertifiedRoutingModule } from './certified-routing.module';
import { CertifiedComponent } from './certified.component';
import { CertifiedDetailComponent } from './certified-detail/certified-detail.component';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    CertifiedComponent,
    CertifiedDetailComponent
  ],
  imports: [
    CommonModule,
    CertifiedRoutingModule,
    ComponentsModule,
  ],

})
export class CertifiedModule { }
