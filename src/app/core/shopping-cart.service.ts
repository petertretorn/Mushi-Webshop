import { Injectable } from '@angular/core';
import { Product } from '@app/models/product';
import { OrderLine } from '@app/models/orderline.model';

@Injectable()
export class ShoppingCartService {

  cart: Map<string, OrderLine> = new Map()

  constructor() { }

  addToCart(product: Product) {

    if (!this.cart.get(product.name)) {
      const orderLine = new OrderLine(product, 1)
      this.cart.set(product.name, orderLine)
    } else {
      this.cart.get(product.name).quantity++
    }
  }

  displayBadgeStyle() {
    return this.cart.size === 0 ? 'hidden' : 'visible'
  }

  totalAmount() {
    let total: number = 0
    
    this.cart.forEach( (line, key) => {
      total += line.quantity * line.product.price
    })

    return total
  }
}
