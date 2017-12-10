import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  ordersRef: AngularFirestoreCollection<{}>;
  

  constructor(private db: AngularFirestore) {
    this.ordersRef = this.db.collection('orders')
   }

  createOrder(order) {
    return this.ordersRef.add(JSON.parse(JSON.stringify(order)))
  }
}
