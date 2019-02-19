import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projectShop';

  constructor(public auth : AuthService){
  }

  
  logout(){
    this.auth.logout();
  }

}
