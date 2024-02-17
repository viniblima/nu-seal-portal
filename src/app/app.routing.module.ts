import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sign-pdf'
    },
    {
        path: 'sign-pdf',
        loadChildren: () => import('./pages/sign-pdf/sign-pdf.module').then(m => m.SignPdfModule),
    },
    {
        path: 'certified',
        loadChildren: () => import('./pages/certified/certified.module').then(m => m.CertifiedModule),
    }
];

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }