import { FormsModule } from '@angular/forms';
import { environment } from './../../environments/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material/material.module';
import { AngularFirestore } from 'angularfire2/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from '@app/shared/navbar/navbar.component';
import { LoginComponent } from '@app/shared/login/login.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  declarations: [
    NavbarComponent,
    LoginComponent
  ],
  exports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NavbarComponent,
    LoginComponent
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      NgModule: 'SharedModule',
    }
  }
}
