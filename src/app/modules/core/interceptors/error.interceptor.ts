import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			retry(0),
			catchError((error: HttpErrorResponse) => {
				if (error.error && error.error.msg && (error.error.msg.indexOf('incorrect') > -1 || error.error.msg.indexOf('your account') > -1)) {
					return throwError(error.error);
				} else if (error.error && error.error.msg) {
					return throwError(error.error.msg);
				} else {
					return throwError(error.error);
				}
			})
		);
	}
}