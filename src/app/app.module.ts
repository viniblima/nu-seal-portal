import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { ComponentsModule } from "./components/components.module";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxTranslateModule } from "./translate/translate.module";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ComponentsModule,
        NgxTranslateModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent],
})
export class AppModule { }