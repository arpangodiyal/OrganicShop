import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  constructor(private db:AngularFireDatabase,
    private cartService: ShoppingCartService,
    private auth:AuthService) { }

  placeOrder(order){
    let result =  this.db.list('/orders').push(order);
    this.cartService.removeAllItems();
    return result;
  }

  getUserOrder(){
    return this.auth.afAuth.user.pipe(
      map(s => {
        return s
      })
    ).pipe(
      map(user => {
        if(user){
          let userid = user.uid;
          console.log(userid);
          return this.db.list('/orders', ref => ref.orderByChild('user').equalTo(userid)).valueChanges();
        }
      })
    )
    }
}
