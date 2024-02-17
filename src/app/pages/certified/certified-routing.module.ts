import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertifiedComponent } from './certified.component';
import { CertifiedDetailComponent } from './certified-detail/certified-detail.component';

const routes: Routes = [
  {
    path: ':id',
    component: CertifiedDetailComponent,
  },
  {
    path: '',
    component: CertifiedComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertifiedRoutingModule { }
