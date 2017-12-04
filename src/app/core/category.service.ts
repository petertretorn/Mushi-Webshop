import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Category } from '@app/models/category.model';

@Injectable()
export class CategoryService {

  collectionRef: AngularFirestoreCollection<Category>

  constructor(private db: AngularFirestore) {
    this.collectionRef = this.db.collection('categories')
  }

  getCategories(): Observable<Category[]> {
    return this.collectionRef.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Category;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  saveCategory(category: Category) {
    this.collectionRef.add( { ...category })
  }

}
