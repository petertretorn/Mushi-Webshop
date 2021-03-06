import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
import { User } from '@app/models/user.model';

@Injectable()
export class AuthService {

  user: Observable<User>;
  isSignedIn: boolean = false

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {

    // Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          this.isSignedIn = true
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return Observable.of(null)
        }
      })
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.oAuthLogin(provider);
  }

  emailLogin(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(resolved => {
      return resolved.uid
    }, rejected => {
      throw new Error('authentication failed')
    }).then(uid => {
      this.afs.doc<User>(`users/${uid}`).valueChanges().subscribe(user => {
        if (!user.isAdmin) throw new Error('Not admin user')
      })
    })
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  public updateUserData(user: User) {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`)
    return userRef.set(JSON.parse(JSON.stringify(user)), { merge: true })
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.isSignedIn = false
      this.router.navigate(['/']);
    });
  }
}