import { Injectable } from '@angular/core';
import { Product } from '@app/models/product';
import { OrderLine } from '@app/models/orderline.model';

@Injectable()
export class ShoppingCartService {

  cart: Map<string, OrderLine> = new Map()

  constructor() { }

  getLines() {
    const lines: OrderLine[] = []

    this.cart.forEach((line, key) => {
      lines.push(line)
    })

    return lines
  }

  addToCart(product: Product) {

    if (!this.cart.get(product.id)) {
      const orderLine = new OrderLine(product, 1)
      this.cart.set(product.id, orderLine)
    } else {
      this.cart.get(product.id).quantity++
    }
  }

  clearCart() {
    this.cart.clear()
  }

  removeLine(id: string) {
    this.cart.delete(id)
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
