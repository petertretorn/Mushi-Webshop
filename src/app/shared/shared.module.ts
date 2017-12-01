import { FormsModule } from '@angular/forms';
import { environment } from './../../environments/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AdminGuard } from './admin.guard';
import { MaterialModule } from '@app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MaterialModule
  ],
  declarations: [],
  providers: [AdminGuard],
  exports: [FormsModule, CommonModule, MaterialModule]
})
export class SharedModule {
  static forRoot() {
    return {
      NgModule: 'SharedModule',
    }
  }
 }
