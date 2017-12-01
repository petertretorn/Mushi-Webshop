import { Injectable } from '@angular/core';
import { Product } from '@app/models/product';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

export class ProductService {

  collection: AngularFirestoreCollection<Product>

  constructor(private db: AngularFirestore) {
    this.collection = this.db.collection('products')
  }
  
  getProducts() {
    return this.collection.valueChanges()
  }

  saveProduct(product: Product) {
    this.collection.add({ ...product })
  }
}
