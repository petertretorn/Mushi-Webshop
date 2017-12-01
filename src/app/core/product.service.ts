import { Injectable } from '@angular/core';
import { Product } from '@app/models/product';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class ProductService {

  collection: AngularFirestoreCollection<Product>

  constructor(private db: AngularFirestore) {
    this.collection = this.db.collection('products')
  }

  saveProduct(product: Product) {
    this.collection.add({ ...product })
  }
}
