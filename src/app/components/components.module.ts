import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DndDirective } from '../utils/dnd/dnd.directive';
import { MatButtonModule } from '@angular/material/button';
import { RaisedButtonComponent } from './raised-button/raised-button.component';
import { StrokedButtonComponent } from './stroked-button/stroked-button.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    DndDirective,
    RaisedButtonComponent,
    StrokedButtonComponent,
  ],
  providers: [],
  imports: [
    MatSidenavModule,
    PdfViewerModule,
    MatButtonModule,
    CommonModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [
    MatSidenavModule,
    PdfViewerModule,
    ToolbarComponent,
    SidenavComponent,
    DndDirective,
    RaisedButtonComponent,
    StrokedButtonComponent,
    TranslateModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
})
export class ComponentsModule {}
