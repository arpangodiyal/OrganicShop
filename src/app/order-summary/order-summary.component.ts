import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit, OnChanges {

  @Input() products:any[] = [];
  totalItemsCount = 0;
  totalPrice = 0;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges){
    if(this.products && changes['products']){

      this.totalItemsCount = 0;
      this.totalPrice = 0;
      for(let i = 0; i < this.products.length; i++){
        this.totalItemsCount += this.products[i].quantity;
        this.totalPrice += this.products[i].product.price * this.products[i].quantity;
      }
    }
  }

}
