import { Router } from '@angular/router';
import { ShoppingCartService } from '@app/core/shopping-cart.service';
import { AuthService } from '@app/core/auth.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  fullName: string
  street: string
  zipAndCity: string

  total: number = 0
  handler: any

  isAuthenticated = false

  constructor(
    private auth: AuthService,
    private cart: ShoppingCartService,
    private router: Router) { }

  ngOnInit() {
    this.setUpStripe()

    this.auth.user.subscribe(user => {
      
      if (user) {
        this.fullName = user.fullName || ''
        this.street = user.street || ''
        this.zipAndCity = user.zipAndCity || ''
  
        console.log('init check-out auth')
        this.isAuthenticated = true
      }
    })
  }

  setUpStripe() {
    this.handler = StripeCheckout.configure({
      key: environment.stripe,
      image: '/assets/images/chagabaggrund.jpg',
      locale: 'da',
      token: token => {
        this.processPayment(token, this.total)
      }
    });
  }

  processPayment(token, amount) {
    //TODO
    console.log('stripe callback')
    console.log(`token : ${token}`)
    console.log(`amount : ${amount}`)
  }

  signInGoogle() {
    this.auth.googleLogin().then( () => {
      console.log('auth success')
    }, () => {
      console.log('auth failed')
    })
  }

  gotoPayment() {
    //TODO process address information

    this.handler.open({
      name: 'Mushi Mushi',
      excerpt: 'Betal for køb',
      currency: 'dkk',
      amount: this.cart.totalAmount() * 100
    });
  }
}
