import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable, forkJoin } from 'rxjs';
import { map, merge, concat } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  totalItemsCount:Observable<number>;
  totalItems:Observable<any>;
  cartItems:any[] = [];

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.totalItemsCount = this.cartService.getAllitemsCount();

    this.cartService.getAllItems().subscribe(s => {
      this.cartItems = s;
      console.log(this.cartItems);
    })
  }

}
