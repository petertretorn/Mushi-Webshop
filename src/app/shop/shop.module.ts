import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductCartComponent } from './product-cart/product-cart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ProductCartComponent, ProductListingComponent],
  declarations: [ProductListingComponent, ProductCartComponent]
})
export class ShopModule { }
