import { MaterialModule } from '@app/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule

  ],
  exports: [ProductCartComponent, ProductListingComponent],
  declarations: [ProductListingComponent, ProductCartComponent, ProductPageComponent, CartComponent],
  providers: []
})
export class ShopModule { }
