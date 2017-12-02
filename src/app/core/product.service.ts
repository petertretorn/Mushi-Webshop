import { Injectable } from '@angular/core';
import { Product } from '@app/models/product';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { BlogService } from '@app/core/blog.service';

@Injectable()
export class ProductService {

  collection: AngularFirestoreCollection<Product>
  product: Observable<Product>;

  constructor(private db: AngularFirestore) {
    this.collection = this.db.collection('products')
  }

  getProducts(): Observable<Product[]> {

    return this.collection.snapshotChanges().map(actions => {       
      return actions.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getProductById(id: string): Observable<Product> {
    const docRef = this.db.doc<Product>(`products/${id}`)
    return docRef.valueChanges();
  }

  updateProduct(product: Product) {
    this.collection.doc(product.id).update({ ...product })
  }

  saveProduct(product: Product) {
    this.collection.add({ ...product })
  }
}
