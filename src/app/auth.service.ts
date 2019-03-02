import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, map }  from 'rxjs/operators'
import { auth } from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private route:ActivatedRoute, private router: Router,
    private db:AngularFireDatabase) {
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    console.log(returnUrl);
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(() => {
        this.router.navigateByUrl(returnUrl);
      });
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  getUser(){
    return this.afAuth.user.pipe(
      switchMap(response => {
        if(response == null) return this.afAuth.user;
        return this.db.object('/users/' + response.uid).valueChanges().pipe(
          map((res) => {
            return res;
          })
        )
      })
    )
  }

  isUserAdmin(){
    return this.afAuth.user.pipe(
      switchMap(response => {
        return this.db.object('/users/' + response.uid + '/isAdmin').valueChanges().pipe(
          map( (res:boolean) => {
            let isadmin: boolean;
            isadmin = res;
            return isadmin;
          })
        )
      }))
  }

}
