import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projectShop';
  user: Observable<{}>;
  constructor(public auth : AuthService){
    this.user = auth.getUser();
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
