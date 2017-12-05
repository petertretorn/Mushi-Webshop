import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatInputModule, MatButtonModule, MatTableModule, MatIconModule, MatSnackBarModule, MatSelectModule, MatToolbarModule, MatMenuModule } from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatToolbarModule,
    MatMenuModule

  ],
  declarations: [],
  exports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatToolbarModule,
    MatMenuModule

  ]
})
export class MaterialModule { }
