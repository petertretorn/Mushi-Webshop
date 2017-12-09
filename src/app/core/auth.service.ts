import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'

interface User {
  uid: string;
  email: string;
  isAdmin: boolean,
  photoURL?: string;
  displayName?: string;
  fullName?: string
  street?: string
  zipAndCity?: string
  favoriteColor?: string;
}

@Injectable()
export class AuthService {

  user: Observable<User>;
  isSignedIn: boolean = false

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {

    //// Get auth data, then get firestore user document || null
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

  emailLogin(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(resolved => {
      return resolved.uid
    }, rejected => {
      throw new Error('authentication failed')
    }).then(uid => {
      this.afs.doc<User>(`users/${uid}`).valueChanges().subscribe(user => {
        if (!user.isAdmin) throw new Error('Not admin user')
        return "success admin user"
      })
    })
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        console.log("logged in: " + credential)
        this.updateUserData(credential.user)
      })
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`)

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      isAdmin: false
    }

    return userRef.set(data)
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      console.log('signed out')
      this.isSignedIn = false
      this.router.navigate(['/']);
    });
  }
}