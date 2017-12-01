import { LoginComponent } from './login/login.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './main/main.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { ProductsListComponent } from './products-list/products-list.component';

@NgModule({
  imports: [
    AdminRoutingModule, SharedModule
  ],
  declarations: [MainComponent, 
    BlogsListComponent, 
    ProductsListComponent,
    CreateBlogComponent,
    LoginComponent
    ]
})
export class AdminModule { }