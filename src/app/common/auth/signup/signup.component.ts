import { Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm } from '@angular/forms';
import { AuthService } from '../auth-data.service';
import { AuthData } from '../auth-data.model';
import { Subscription } from 'rxjs';
import { ErrorComponent  } from '../../error/error.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit , OnDestroy {
  private authStatusSub: Subscription;
  constructor(public authService: AuthService, public matDialog: MatDialog) {}
  isLoading = false;
  genres = ['Mujer', 'Hombre', 'Otro'];
  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().
    subscribe(
      authStatus => {
        this.isLoading = authStatus;
      }
    );
  }
  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (form.value.password !== form.value.confirmationPassword) {
      this.matDialog.open(ErrorComponent, {data: { kind: '¡Error!', message: 'Contraseñas no coinciden'}});
      return;
    }
    this.isLoading = true;
    const authData: AuthData = {
      name: form.value.name,
      lastName: form.value.last,
      email: form.value.email,
      password: form.value.password,
      genre: form.value.genre,
      isAdmin: form.value.iam === 'estudiante' ? false : true,
      key: form.value.key
    };
    console.log(authData);
    this.authService.createUser(authData);
    // this.authService.login(form.value.email, form.value.password);
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
