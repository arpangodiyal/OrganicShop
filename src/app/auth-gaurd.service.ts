import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from './auth.service';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
   }

  canActivate(route, state:RouterStateSnapshot): Observable<boolean>{
    return this.auth.afAuth.user.pipe(map(x => {
      if(x){
        return true;
      }
      else{
        this.router.navigate(['/login'], {queryParams: {returnUrl : state.url}});
        return false;
      }
    }))
  }
}
