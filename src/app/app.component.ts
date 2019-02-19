import { Component, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projectShop';

  constructor(private afAuth : AngularFireAuth){
  }

  login(){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  
  logout(){
    this.afAuth.auth.signOut();
  }

}
