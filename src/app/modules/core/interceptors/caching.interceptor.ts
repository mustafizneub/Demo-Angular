import { Injectable } from "@angular/core";
import {
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse
} from "@angular/common/http";

import { Observable } from "rxjs";

import { CacheService } from "../cacheService";

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
	private cachedData = new Map<string, any>();

	constructor(private cacheRegistrationService: CacheService) {
	}

	public intercept(httpRequest: HttpRequest<any>, handler: HttpHandler) {
		
		if (httpRequest.method !== "GET" ||
			!this.cacheRegistrationService.addedToCache(httpRequest.url)) {
			return handler.handle(httpRequest);
		}

		
		if (httpRequest.headers.get("reset-cache")) {
			this.cachedData.delete(httpRequest.urlWithParams);
		}

		
		const lastResponse = this.cachedData.get(httpRequest.urlWithParams);
		if (lastResponse) {
			
			return (lastResponse instanceof Observable)
				? lastResponse : Observable.of(lastResponse.clone());
		}

		const requestHandle = handler.handle(httpRequest).do((stateEvent) => {
			if (stateEvent instanceof HttpResponse) {
				this.cachedData.set(
					httpRequest.urlWithParams,
					stateEvent.clone()
				);
			}
		}).share();

		this.cachedData.set(httpRequest.urlWithParams, requestHandle);

		return requestHandle;
	}
}