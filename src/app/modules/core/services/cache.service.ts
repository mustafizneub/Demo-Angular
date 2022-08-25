import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CacheService {

	constructor() { }
	private services = [];

	public addedToCache(serviceUri: never) {
		return this.services.indexOf(serviceUri) > -1;
	}

	public addToCache(serviceUri: never) {
		// Check if not already added to list
		if (!this.addedToCache(serviceUri)) {
			this.services.push(serviceUri);
		}
	}
}
