import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { AuthService } from '../auth/auth-data.service';
import {Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {
  userIsAuthenticated = false;
  userName: string;
  userType: string;
  isAdmin = false;
  constructor(public authService: AuthService) { }
  private userInfoSubs: Subscription;
  private userAuthSubs: Subscription;
  ngOnInit() {
    console.log('ngOnInit of header');
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userName = this.authService.getUserName();
    this.userType = this.authService.getUserType();
    this.isAdmin = this.userType === 'Admin' ? true : false;
    console.log(this.userType);
    this.isAdmin = this.userType === 'Admin' ? true : false;
    this.userInfoSubs = this.authService.getUserInfoListener().subscribe((userInfo: {userName: string, userType: string}) => {
      console.log('update to userId in header');
      this.userName = userInfo.userName;
      this.userType = userInfo.userType;
      this.isAdmin = userInfo.userType === 'Admin' ? true : false;
    });
    this.userAuthSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      /*if (!isAuthenticated) {
        /// empty userName and userType
        //this.userName = this.userType = '';
      }*/
    });
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userInfoSubs.unsubscribe();
    this.userAuthSubs.unsubscribe();
  }
}
