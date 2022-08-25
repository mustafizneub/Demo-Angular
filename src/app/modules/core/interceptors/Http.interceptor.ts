import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor() { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let currentUser = localStorage['tempToken'] ? localStorage['tempToken'] : localStorage['accessToken'];

		if (request.url.indexOf('payment/session/set') > -1) {
			let auth = '';
			if (request.body && request.body.trackBy) {
				auth = request.body.trackBy;
				delete request.body.trackBy;
			}
			request = request.clone({
				setHeaders: {
					'Content-Type': `application/json`,
					'Authorization': `Basic ${auth}`
				},
			});
		} else {
			request = request.clone({
				setHeaders: {
					Accept: `application/json`,
					'Content-Type': `application/json`,
					Authorization: `Bearer ${currentUser}`
				},
				// withCredentials: true
			});
		}
		return next.handle(request);
	}

}