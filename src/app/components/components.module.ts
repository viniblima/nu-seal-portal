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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
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
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatInputModule,
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
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonToggleModule,
    MatInputModule,
  ],
})
export class ComponentsModule {}
