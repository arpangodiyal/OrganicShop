import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projectShop';
  user: Observable<{}>;
  totalItems:Observable<number>;
  constructor(public auth : AuthService, 
    private cartService:ShoppingCartService)
  {

    this.user = auth.getUser();
    this.totalItems = this.cartService.getAllitemsCount();
    
  }

  
  logout(){
    this.auth.logout();
  }

  // isAdmin:boolean = () => {
  //   this.auth.isUserAdmin().subscribe(x => {
  //     if(x) return true;
  //     else return false;
  //   })
  // }

}
