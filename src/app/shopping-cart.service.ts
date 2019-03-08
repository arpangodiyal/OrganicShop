import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  private getCart(cartId:string){
    return this.db.object('/shopping-cart/' + cartId);
  }

  private create(){
    return this.db.list('/shopping-cart').push({
      dateCreated : new Date().getTime()
    });
  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if( !cartId ){
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
    else{
      return cartId;
    }
  }

  async addToCart(product){
    let cartId = await this.getOrCreateCartId();
    let item = this.db.object('/shopping-cart/' + cartId + '/items/' + product.key);
    (item.valueChanges() as Observable<{'quantity':number}>).pipe(
      take(1)
    ).subscribe(res => {
      if(res != null){
        item.update({'quantity':res.quantity + 1})
      }
      else{
        item.update({product,'quantity':1});
      }

    })
  }
}
