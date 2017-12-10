import { User } from '@app/models/user.model';
import { AuthService } from '@app/core/auth.service';
import { ShoppingCartService } from '@app/core/shopping-cart.service';
import { Payment } from './../models/payment.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { OrderService } from '@app/core/order.service';
import { AddressInfo } from '@app/models/addressInfo.model';

@Injectable()
export class PaymentService {
  total: number;
  addressInfo: AddressInfo
  user: User
  handler: any
  paymentRef: AngularFirestoreCollection<Payment>;

  constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    private cartService: ShoppingCartService,
    private orderService: OrderService) {
    
    this.paymentRef = this.db.collection('payments')
  }

  setUpStripe(user: User) {

    this.user = user
    const total = this.cartService.totalAmount() * 100
    this.total = total

    this.handler = StripeCheckout.configure({
      key: environment.stripe,
      image: '/assets/images/chagabaggrund.jpg',
      locale: 'da',
      token: token => {
        this.processPayment(token, total)
      }
    });
  }

  processPayment(token, amount) {
    const payment = { token, amount }
    this.paymentRef.doc(this.user.uid).set(payment)

    this.handleOrder()
    this.cartService.cart.clear()
  }

  setAddress(addressInfo: AddressInfo) {
    this.addressInfo = addressInfo
  }

  handleOrder() {

    Object.assign(this.user, this.addressInfo)

    const order = {
      date: new Date(),
      lines: this.cartService.getLines(),
      uid: this.user.uid,
      shipping: this.addressInfo,
      paid: false,
      processed: false,
      total: this.total
    }

    this.orderService.createOrder(order).then(res => {
      this.user.orders = this.user.orders || []
      this.user.orders.push(res.id);

      this.authService.updateUserData(this.user)
    })
  }
}
