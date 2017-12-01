import { Blog } from './../models/blog';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class BlogService {

  collection: AngularFirestoreCollection<Blog>

  constructor(private db: AngularFirestore) {
    this.collection = this.db.collection('blogs')
  }

  getBlogs(): Observable<Blog[]> {
    return this.collection.valueChanges()
  }

  saveBlog(blog: Blog) {
    blog.edited = new Date();
    this.collection.add( { ...blog })
  }
}
