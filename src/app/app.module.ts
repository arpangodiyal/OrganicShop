import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes} from '@angular/router';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'shoppingCart', component:  ShoppingCartComponent},
  { path: 'login', component:  LoginComponent},
];


var config = {
  apiKey: "AIzaSyD1bS0c1TGbLM72oeic0E-mT12vvAFgnhQ",
  authDomain: "organicshop-51241.firebaseapp.com",
  databaseURL: "https://organicshop-51241.firebaseio.com",
  projectId: "organicshop-51241",
  storageBucket: "organicshop-51241.appspot.com",
  messagingSenderId: "695997109470"
};


@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
