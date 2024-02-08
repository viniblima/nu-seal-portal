import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignPdfRoutingModule } from './sign-pdf-routing.module';
import { SignPdfComponent } from './sign-pdf.component';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    SignPdfComponent
  ],
  imports: [
    CommonModule,
    SignPdfRoutingModule,
    ComponentsModule,
  ]
})
export class SignPdfModule { }
