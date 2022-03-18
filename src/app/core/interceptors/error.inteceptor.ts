import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, of, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ErrorComponent } from "../components/error/error.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   return next.handle(req).pipe(catchError((err) => {
     console.log(err);
     let errMessage = 'An unknown error occurred!';
     if (err.error.message) {
       errMessage = err.error.message;
     }
     this.dialog.open(ErrorComponent, {
       data: errMessage
     });
     return throwError(() => new Error(err.error.message));
   }))
  }
}
