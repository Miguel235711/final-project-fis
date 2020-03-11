import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from './common/error/error.component';

@Injectable()
export class SuccessInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && event.status === 201 ) {
            this.dialog.open(ErrorComponent, {data: {kind: 'Exitoso' , message: event.body.message}});
          }
        }
      )
    );
  }
}
