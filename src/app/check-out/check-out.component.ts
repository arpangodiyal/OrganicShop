import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { CheckOutService } from '../check-out.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  shipping:{};
  products:any[];
  
  constructor(private cartService:ShoppingCartService,
    private checkOutService:CheckOutService,
    private authService:AuthService,
    private router:Router) { 
    }

  ngOnInit() {
    this.cartService.getAllItems().subscribe(s => {
      this.products = s;
    });
  }

  save(values){
    let order = {
      dateCreated: new Date().getTime(),
      shipping: values,
      products:this.products,
      user:this.authService.afAuth.auth.currentUser.uid
    }
    this.checkOutService.placeOrder(order).then(res => {
      this.router.navigate(['/order-success', res.key]);
    })
  }

}
