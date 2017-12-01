import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '@app/core/blog.service';
import { ProductService } from '@app/core/product.service';
import { AuthService } from '@app/core/auth.service';
import { FireService } from './fire.service';
import { DummyService } from './dummy.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [BlogService, ProductService, AuthService, FireService, DummyService]
})
export class CoreModule { }
