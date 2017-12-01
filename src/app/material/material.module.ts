import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatInputModule, MatButtonModule } from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [],
  exports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
