import { User } from '@app/models/user.model';
import { AuthService } from '@app/core/auth.service';
import { ShoppingCartService } from '@app/core/shopping-cart.service';
import { Payment } from './../models/payment.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { OrderService } from '@app/core/order.service';
import { AddressInfo } from '@app/models/addressInfo.model';
import { OrderLine } from '@app/models/orderline.model';

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
    this.handleOrder().then(orderId => {
      const payment = { orderId, token, amount, userId: this.user.uid }
      this.paymentRef.add(payment)
      
      this.cartService.cart.clear()
    })
  }

  setAddress(addressInfo: AddressInfo) {
    this.addressInfo = addressInfo
  }

  handleOrder() {

    Object.assign(this.user, this.addressInfo)

    const lines = this.mapLines( this.cartService.getLines())

    const order = {
      date: new Date(),
      lines: lines,
      uid: this.user.uid,
      shipping: this.addressInfo,
      status: 'not paid',
      total: this.total
    }

    return this.orderService.createOrder(order).then(res => {
      this.user.orders = this.user.orders || []
      this.user.orders.push(res.id);

      this.authService.updateUserData(this.user)

      return res.id
    })
  }

  mapLines(lines: OrderLine[]) {
    return lines
    .map(line => {
      return {
        id: line.product.id,
        name: line.product.name,
        quantity: line.quantity
      }
    })
  }
}
