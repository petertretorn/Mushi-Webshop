import { DummyService } from './dummy.service';
import { FireService } from './fire.service';
import { Injectable } from '@angular/core';
import { Product } from '@app/models/product';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { BlogService } from '@app/core/blog.service';

@Injectable()
export class ProductService {

  collection: AngularFirestoreCollection<Product>

  constructor(private db: AngularFirestore) {
    this.collection = this.db.collection('products')
  }

  getProducts(): Observable<Product[]> {
    return this.collection.valueChanges()
  }

  saveProduct(product: Product) {
    this.collection.add({ ...product })
  }
}
