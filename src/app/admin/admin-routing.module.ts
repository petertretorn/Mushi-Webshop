import { EditProductComponent } from './edit-product/edit-product.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'create-blog', component: CreateBlogComponent },
      { path: 'edit-product/:id', component: EditProductComponent },
      { path: 'blogs-list', component: BlogsListComponent },
      { path: 'products-list', component: ProductsListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
