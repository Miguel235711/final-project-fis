import { Component, OnInit , OnDestroy } from '@angular/core';
import { AuthService } from './common/auth/auth-data.service';
import { Subscription} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy {
  constructor(public authService: AuthService, public router: Router) {}
  userAuthSubs: Subscription;
  authenticated = false;
  title = 'final-project-fis';
  ngOnInit() {
    this.authService.autoAuthUser();
    this.authenticated = this.authService.getIsAuth();
    console.log('this.authenticated', this.authenticated);
    if (this.authenticated && this.router.url[0] === '/') {
      this.router.navigate(['/NewsFeed']);
    } else if (!this.authenticated) {
      this.router.navigate(['/']);
    }
    this.userAuthSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        this.router.navigate(['/']);
      }
      console.log('app component', isAuthenticated);
      this.authenticated = isAuthenticated;
    });
  }
  ngOnDestroy() {
    this.userAuthSubs.unsubscribe();
  }
}
