import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

        return next.handle(req)
        .pipe(catchError(this.handleHttpError))
  }

  /** @description function that handle http error */
  private handleHttpError(error: HttpErrorResponse) {
    if(error.status === 0) {
      // client-side or network error.
      console.log(`CLINT-SIDE ERROR`, error)
    } else {
      // back-end error with unsucssfu response code (eg. 401)
      console.log(`BACK-SIDE ERROR`, error)
    }

    return throwError(() => new Error('Something bad happened; please try again later.'))
  }
}