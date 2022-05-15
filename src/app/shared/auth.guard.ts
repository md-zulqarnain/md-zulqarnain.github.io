import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { 

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.userService.loggedInUser()) {
      if (this.userService.loggedInUser().isVerified || this.userService.loggedInUser().isAdmin) {

      } else {  
        window.alert('Access Denied, Login is Required to Access This Page!');
        this.router.navigate(['home']);
      }
    }
    return true;
  }
  
}
