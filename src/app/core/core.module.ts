import { FileService } from '@app/core/file.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '@app/core/blog.service';
import { ProductService } from '@app/core/product.service';
import { AuthService } from '@app/core/auth.service';
import { CategoryService } from './category.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [BlogService, ProductService, AuthService, FileService, CategoryService]
})
export class CoreModule { }
