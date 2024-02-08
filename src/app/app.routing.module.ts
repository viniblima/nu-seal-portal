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
    }
];

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }