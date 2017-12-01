import { FormsModule } from '@angular/forms';
import { environment } from './../../environments/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material/material.module';
import { AngularFirestore } from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [],
  exports: [ FormsModule, CommonModule, MaterialModule]
})
export class SharedModule {
  static forRoot() {
    return {
      NgModule: 'SharedModule',
    }
  }
 }
