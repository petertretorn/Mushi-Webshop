import { environment } from './../environments/environment';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginComponent } from '@app/shared/login/login.component';
import { ShopModule } from '@app/shop/shop.module';
import { LandingComponent } from '@app/landing/landing.component';
import { AppRoutingModule } from '@app/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    CoreModule,
    ShopModule
  ],
  entryComponents: [LoginComponent, LandingComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
