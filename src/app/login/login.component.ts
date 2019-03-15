import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private UserService: UserService) { 
  }

  ngOnInit() {
  }

  login(){
    this.auth.login();
    this.auth.afAuth.user.subscribe(response => {
      if(response){
        this.UserService.save(response);
      }
    })
  }

}
