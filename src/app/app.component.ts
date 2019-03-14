import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  
  title = 'projectShop';
  user: Observable<{}>;
  subscription:Subscription;
  totalItems = 0;

  constructor(public auth : AuthService, 
    private cartService:ShoppingCartService)
  {
    this.user = auth.getUser();

    this.cartService.getAllitemsCount().then(obs => {
      this.subscription = obs.subscribe(s => {
        this.totalItems = s;
      })
    })
    
  }

  
  logout(){
    this.auth.logout();
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }

  // isAdmin:boolean = () => {
  //   this.auth.isUserAdmin().subscribe(x => {
  //     if(x) return true;
  //     else return false;
  //   })
  // }

}
