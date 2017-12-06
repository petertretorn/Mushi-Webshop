import { CreateBlogComponent } from './create-blog/create-blog.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './main/main.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { EditProductComponent } from './edit-product/edit-product.component';

@NgModule({
  imports: [
    AdminRoutingModule, SharedModule
  ],
  declarations: [MainComponent, 
    BlogsListComponent, 
    ProductsListComponent,
    CreateBlogComponent,
    EditProductComponent
    ]
})
export class AdminModule { }