import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CheckOutService } from '../check-out.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnChanges {

  userOrders:{}[] = [];

  constructor(private orders:CheckOutService) { 
  }

  ngOnInit() {
    this.orders.getUserOrder().subscribe(obs => {
      if(obs){
        obs.subscribe(s => {
          for(let i = 0; i < s.length; i++){
            this.userOrders.push(s[i]);
          }
        });
      }
    })
  }

  ngOnChanges(change:SimpleChanges){
  }

}
