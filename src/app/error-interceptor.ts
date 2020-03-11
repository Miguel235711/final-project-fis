import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from './common/error/error.component';
import { AuthService } from './common/auth/auth-data.service';
import {Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private dialog: MatDialog, public authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        this.dialog.open(ErrorComponent, {data: { kind: '¡Error!', message: errorMessage}});
        console.log('this.authService.getIsAuth()', this.authService.getIsAuth());
        if (!this.authService.getIsAuth()) {
          this.router.navigate(['/']);
        }
        return throwError(error); /// return observable
      })
    );
  }
}
