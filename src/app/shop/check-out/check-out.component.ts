import { OrderService } from './../../core/order.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { ShoppingCartService } from '@app/core/shopping-cart.service';
import { AuthService } from '@app/core/auth.service';
import { Component, OnInit } from '@angular/core';

import { Payment } from '@app/models/payment.model';
import { User } from '@app/models/user.model';
import { PaymentService } from '../../core/payment.service';
import { AddressInfo } from '@app/models/addressInfo.model';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  user: User

  addressInfo: AddressInfo

  fullName: string
  street: string
  zipAndCity: string

  total: number = 0

  isAuthenticated = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private paymentService: PaymentService) { }

  ngOnInit() {

    this.authService.user.subscribe(user => {
      if (user) {
        console.log('fullname: ' + user.fullName)
        this.user = user
        this.fullName = user.fullName || ''
        this.street = user.street || ''
        this.zipAndCity = user.zipAndCity || ''
        this.isAuthenticated = true

        this.paymentService.setUpStripe(user)
      }
    })
  }

  signInGoogle() {
    this.authService.googleLogin().then(() => {
      console.log('auth success')
    }, () => {
      console.log('auth failed')
    })
  }

  signInFacebook() {
    this.authService.facebookLogin().then(() => {
      console.log('auth success')
    })
  }

  openStripeDialog() {
    const addressInfo: AddressInfo = {
      fullName: this.fullName,
      street: this.street,
      zipAndCity: this.zipAndCity
    }
    this.paymentService.setAddress(addressInfo)

    this.paymentService.handler.open({
      name: 'Mushi Mushi',
      excerpt: 'Betal for køb',
      currency: 'dkk',
      amount: this.total
    })
  }
}
