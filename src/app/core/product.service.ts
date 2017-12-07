import { Injectable } from '@angular/core';
import { Product } from '@app/models/product';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { BlogService } from '@app/core/blog.service';
import { FileService } from '@app/core/file.service';

@Injectable()
export class ProductService {

  collectionRef: AngularFirestoreCollection<Product>
  product: Observable<Product>;

  constructor(private db: AngularFirestore, private fileService: FileService) {
    this.collectionRef = this.db.collection('products')
  }

  getProducts(): Observable<Product[]> {

    return this.collectionRef.snapshotChanges().map(actions => {
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
    const json = JSON.stringify(product)
    const obj = JSON.parse(json)
    return this.collectionRef.doc(product.id).update({ ...obj })
  }

  saveProduct(product: Product) {
    const json = JSON.stringify(product)
    const obj = JSON.parse(json)
    return this.collectionRef.add({ ...obj })
  }

  deleteProduct(product: Product) {
    this.fileService.deleteFile(product.imageFileName)
    return this.collectionRef.doc(product.id).delete()
  }
}
