import { AuthService } from './../../core/auth.service';
import { OrderLine } from './../../models/orderline.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '@app/core/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  lines: OrderLine[]

  total: number

  constructor(
    private router: Router,
    public cartService: ShoppingCartService,
    private auth: AuthService) { }

  ngOnInit() {
    this.updateCartData()
  }

  updateCartData() {
    this.lines = this.cartService.getLines()
    this.total = this.cartService.totalAmount()
  }

  removeLine(productId) {
    this.cartService.removeLine(productId)
    this.updateCartData()
  }

  clearCart() {
    this.cartService.cart.clear()
    this.updateCartData()
  }

}
