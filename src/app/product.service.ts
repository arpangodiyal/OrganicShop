import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product){
    this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products').snapshotChanges()
    .pipe(map(items => {            // <== new way of chaining
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};           // or {key, ...data} in case data is Obj
      });
    }));
  }

  getProduct(id){
    return this.db.object('/products/' + id).valueChanges();
  }

  update(product:{}, id:string){
    this.db.object('/products/' + id).update(product);
  }

  deleteProduct(id){
    let itemRef;
    itemRef = this.db.object('/products/' + id);
    itemRef.remove();
  }

}
