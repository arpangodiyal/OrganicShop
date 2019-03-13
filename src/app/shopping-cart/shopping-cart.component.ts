import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  totalItemsCount:Observable<number>;
  totalItems:Observable<any>;
  cartItems:any[] = [];
  totalPrice:number = 0;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.totalItemsCount = this.cartService.getAllitemsCount();

    this.cartService.getAllItems().subscribe(s => {
      this.cartItems = s;
      this.totalPrice = 0;
      for(let key in s){
        this.totalPrice += s[key].product.price * s[key].quantity;
      }
    })
  }

  add(product){
    this.cartService.addToCart(product);
  }

  remove(product){
    this.cartService.removeFromCart(product);
  }

  clear(){
    this.cartService.removeAllItems();
  }

}
