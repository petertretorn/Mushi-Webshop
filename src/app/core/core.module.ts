import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '@app/core/blog.service';
import { ProductService } from '@app/core/product.service';
import { AuthService } from '@app/core/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [],
  providers: [BlogService, ProductService, AuthService]
})
export class CoreModule { }
