import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { AuthService } from './auth.service';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
   }

  canActivate(){
    return this.auth.afAuth.user.pipe(map(x => {
      if(x){
        return true;
      }
      else{
        this.router.navigate(['/login']);
        return false;
      }
    }))
  }
}
