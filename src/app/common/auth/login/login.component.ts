import { Component, OnInit , OnDestroy } from '@angular/core';
import {NgForm } from '@angular/forms';
import { AuthService } from '../auth-data.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnDestroy {
  isLoading = false;
  constructor(public authService: AuthService) { }
  authServiceSubs: Subscription;

  ngOnInit() {
    this.authServiceSubs = this.authService.getAuthStatusListener().subscribe(result => {
      this.isLoading = result;
    });
  }
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    console.log(form.value.iam);
    this.authService.login(form.value.email, form.value.password, form.value.iam === 'estudiante' ? false : true);
  }
  ngOnDestroy() {
    this.authServiceSubs.unsubscribe();
  }
}
