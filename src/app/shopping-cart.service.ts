import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from './models/productInterface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  getItem(cartId:string, product){
    return this.db.object('/shopping-cart/' + cartId + '/items/' + product.key);
  }

  getAllItems(){
    let cartId = localStorage.getItem('cartId');
    let items = this.db.object('/shopping-cart/' + cartId + '/items');
    return (items.valueChanges() as Observable<{product:Product, quantity:number}>)
      .pipe(
        map(s => {
          let allItems = [];
          for(let key in s){
            let obj:{product:Product, quantity:number}
            allItems.push(s[key]);
          }
          return allItems;
        })
      );
  }

  async getAllitemsCount(){
    let cartId = await this.getOrCreateCartId();
    // if(!cartId) return Observable<number>;
    return this.db.object('/shopping-cart/' + cartId + '/items').valueChanges().pipe(
      map(s => {
        let total = 0;
        for(let i in s){
          total += s[i].quantity;
        }
        return total;
      })
    );
  }

  private create(){
    return this.db.list('/shopping-cart').push({
      dateCreated : new Date().getTime()
    });
  }

  async getOrCreateCartId(){
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

  removeAllItems(){
    let cartId = localStorage.getItem('cartId');
    this.db.object('/shopping-cart/' + cartId + '/items').remove();
  }
}
