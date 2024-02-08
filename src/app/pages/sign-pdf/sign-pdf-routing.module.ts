import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignPdfComponent } from './sign-pdf.component';

const routes: Routes = [
  {
    path: '',
    component: SignPdfComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignPdfRoutingModule { }
