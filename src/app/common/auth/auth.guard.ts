import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import {Observable } from 'rxjs';
import { AuthService } from './auth-data.service';
import { Injectable } from '@angular/core';
/// implement method the method router can execute before loading route
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuth = this.authService.getIsAuth();
    console.log('isAuth', isAuth);
    console.log('isAuth Result' + isAuth);
    console.log('route', route.url[0].path);
    if (!isAuth) {
      this.router.navigate(['/']);
      /// redirect because client shouldn't access this route
    } else if (route.url[0].path === 'Inventory' && this.authService.getUserType() === 'Estudiante') {
      this.router.navigate(['/NewsFeed']);
    } else if (route.url[0].path === '/') {
      this.router.navigate(['/NewsFeed']);
    }
    return isAuth;
  }
}
