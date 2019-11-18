import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthData} from './auth-data.model';
import {AuthLogData } from './auth-log-data.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTime: any;
  private userId: string;
  private userName: string;
  private userType;
  /// to know if the user is authenticated or not
  private authStatusListener = new Subject<boolean>();
  private userInfoListener = new Subject<{userName: string, userType: string} >();
  constructor(private http: HttpClient, private router: Router) {}
  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getUserId() {
    return this.userId;
  }
  getUserInfoListener() {
    return this.userInfoListener.asObservable();
  }
  getAuthStatusListener() {
    /// get as observable
    return this.authStatusListener.asObservable();
  }
  createUser(authData: AuthData) {
    return this.http.post('http://localhost:3000/api/user/signup', authData).subscribe(() => {
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.authStatusListener.next(false);
    }); /// return observable
  }
  login(email: string, password: string, isAdmin: boolean) {
    const authData: AuthLogData = {email, password, isAdmin};
    this.http.post<{
      token: string,
      expiresIn: number,
      userId: string,
      userName: string,
      userType: string}>('http://localhost:3000/api/user/login', authData).
      subscribe(response => {
        const token = response.token;
        this.token = token;
        /// inform change
        if (token) {
          const expiresInDuration = response.expiresIn;
          /// seconds to miliseconds conversion
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId);
          console.log('redirect to /NewsFeed ');
          /// emmit event
          this.userName = response.userName;
          this.userType = response.userType;
          this.userInfoListener.next({userName: response.userName, userType: response.userType});
          this.router.navigate(['/NewsFeed']);
        }
        console.log('login subscription successfull');
      }, error => {
        this.authStatusListener.next(false);
      });
  }
  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTime = setTimeout(() => {
      this.logout();
    }, duration  * 1000 );
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    /// check if it still valid from date perspective
    if (!authInformation) {
      return ;
    }
    const now = new Date();
    /// .getTime() is in miliseconds by default, therefore with divide by 1000
    const expiresIn = (authInformation.expirationDate.getTime() - now.getTime()) / 1000 ;
    console.log(authInformation, expiresIn);
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn);
      this.authStatusListener.next(true);
    }
  }
  logout() {
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
    this.clearAuthData();
    clearTimeout(this.tokenTime);
  }
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }
  private getAuthData() {
    /// get auth data from local storage
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }
  getUserName() {
    return this.userName;
  }
  getUserType() {
    return this.userType;
  }
}
