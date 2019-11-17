import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth-data.service';
import {Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated = false;
  userName: string;
  constructor(public authService: AuthService) { }
  private userInfoSubs: Subscription;
  ngOnInit() {
    console.log('ngOnInit of header');
    this.userInfoSubs = this.authService.getUserInfoListener().subscribe(userName => {
      console.log('update to userId in header');
      this.userName = userName;
    });
  }
  onLogout() {}
}
