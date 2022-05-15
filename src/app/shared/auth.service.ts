import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public afs: AngularFirestore
  ) {
    // Setting logged in user in localstorage else null
    this.signInOut()  

  }

  signInOut() { 
    this.afAuth.authState.subscribe( async (user) => {
      console.log(user, 'useruseruseruser')
      if (user) {
        console.log(user, 'useruseruseruser inside')
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        // JSON.parse(localStorage.getItem('user')!);

        let datanew = {
          displayName: this.userData.displayName,
          email: this.userData.email,
          photoURL: this.userData.photoURL,
          uid: this.userData.uid,
        }



        // const newuser = this.afs.database.object(`users/${user.uid}`);
        // newuser.subscribe((data:any) => {
        //   if(data.$value !== null) {
        //     console.log('User does not exist');
        //   } else {
          //     console.log('User does exist');
          //   }
        // });
        //   const doc = await this.afs.doc(`users/${user.uid}`).valueChanges().pipe(first()).toPromise()
        //   console.log(datanew, 'datanewdatanewdatanew')
        //   console.log(doc, 'docdoc')
        //   if (doc) {
        //    console.log('ifififififif')
        //   } else {
        //     console.log('elseelseelse')
        //     await this.afs.collection('users').add(datanew);
        //   }
        // this.db.object('news/' + id);
        console.log(user.uid, 'User does not exist');

        let items = this.afs.doc("users/" + user.uid);
        // items.unsubscribe();

        try { 
          let data = await this.afs.collection('users', ref => {
          return ref
            .where('uid', '==', user.uid)
          });
          data.valueChanges().subscribe((d:any) => { 
            console.log(d, "fsd afsadf sdafsad fsda fsdfsd")
            if (d.length === 0) { 
              console.log('data empty')
              items.set(datanew)
              localStorage.setItem('loginuser', JSON.stringify(datanew));
            } else {
              console.log('User does exist');
              localStorage.setItem('loginuser', JSON.stringify(d[0]));
            }
            
          })
        }catch (err) { 
          console.log(err, 'eratssa')
        }

      } else {
        console.log(user,' else testData')
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
        localStorage.setItem('loginuser', 'null');
        JSON.parse(localStorage.getItem('loginuser')!);
      }
    });
  }


  docExists(path: string) {
    console.log(path, 'pathpath')
    return this.afs.doc(path).valueChanges().pipe(first()).toPromise()
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    this.signInOut()
    let localstorage = localStorage.getItem('user');
    console.log(localstorage, 'localstorage')
    const user = JSON.parse(localstorage!);
    console.log(user, 'user')
    return (user !== null) ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        console.log(result, 'result')
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
      })
      .catch((error: any) => {
        window.alert(error);
      });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.setItem('user', 'null');
      localStorage.setItem('loginuser', 'null');
      this.router.navigate(['home']);
    });
  }
 

}