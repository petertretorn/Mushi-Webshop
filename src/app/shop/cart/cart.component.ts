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

  lines: OrderLine[] = []

  total: number = 0

  handler: any

  constructor(
    private router: Router,
    public cartService: ShoppingCartService) { }

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: 'pk_test_wQnTi08TC2AjNy092D5mAEPU',
      image: '/assets/images/chagabaggrund.jpg',
      locale: 'da',
      token: token => {
        this.processPayment(token, this.total)
      }
    });


    this.cartService.cart.forEach( (line, key) => {
      this.lines.push(line)
      this.total += line.quantity * line.product.price
    })


  }

  processPayment(token, amount) {
    console.log(`token : ${token}`)
    console.log(`amount : ${amount}`)
  }

  checkOut() {
    console.log('checking out')

    this.handler.open({
      name: 'Mushi Mushi',
      excerpt: 'Betal for køb',
      currency: 'dkk',
      amount: this.total * 100
    });
  }
}
