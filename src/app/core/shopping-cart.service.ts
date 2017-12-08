import { Injectable } from '@angular/core';
import { Product } from '@app/models/product';

@Injectable()
export class ShoppingCartService {

  items: any[] = []

  constructor() { }

  addToCart(product: Product) {
    console.log('adding to cart: ' + product.name)
    this.items.push( { quantity: 1, product })
  }
}
