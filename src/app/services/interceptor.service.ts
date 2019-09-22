import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private toast: ToastService,
    private spinner: NgxSpinnerService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    return next.handle(req).pipe(
      finalize(() => {
        this.spinner.hide();
      }),
      catchError((err: HttpErrorResponse) => {

        if (err.status === 404) {
            this.toast.show(err.message, err.status.toString(), 2);
            this.router.navigate(['dashboard', 'posts']);
        }

        return throwError( err );

      })
    );
  }

}
