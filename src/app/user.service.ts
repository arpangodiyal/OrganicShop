import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db:AngularFireDatabase, private afAuth: AngularFireAuth) { 
  }

  save(user: firebase.User){
    console.log('Hello');
    this.db.object('/users/' + user.uid).update({'Name':user.displayName});
  }
}
