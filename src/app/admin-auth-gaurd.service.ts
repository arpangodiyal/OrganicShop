import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurdService implements CanActivate {

  constructor(private auth:AuthService, private db:AngularFireDatabase) { }

  canActivate(route, state){
    return this.auth.isUserAdmin();
  }
}


//return this.db.object('/users/' + response.uid + '/isAdmin').valueChanges().pipe(map(res => {