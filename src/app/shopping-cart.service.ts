import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  getItem(cartId:string, product){
    return this.db.object('/shopping-cart/' + cartId + '/items/' + product.key);
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

  async removeFromCart(product): Promise<number> {
    let cartId = await this.getOrCreateCartId();
    let item = this.db.object('/shopping-cart/' + cartId + '/items/' + product.key);
    return (item.valueChanges() as Observable<{'quantity':number}>).pipe(
      take(1)
    ).pipe(map(res => {
        if(res.quantity == 1){
          return item.remove().then(r => {
            return 0;
          })
        }
        else return item.update({quantity: res.quantity - 1}).then(r => {
          return 1;
        })
      })).toPromise();
  }
}
