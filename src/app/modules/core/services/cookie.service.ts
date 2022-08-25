import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CookieService {

	constructor() { }
	/**
	   * Set cookie to the browser
	   * @param name 
	   * cookie name
	   * @param value 
	   * cookie value
	   * @param hour | optional
	   * cookie expire time
	   */
	setCookie(name: string, value: any, hour?: number) {
		let expires = "";
		if (hour) {
			let date = new Date();
			date.setTime(date.getTime() + (hour * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = document.cookie = name + "=" + (encodeURIComponent(JSON.stringify(value)) || "") + expires + "; path=/";
	}
	/**
	 * Get cookie from the browser
	 * @param name 
	 * cookie name
	 * @returns 
	 */
	getCookie(name: string) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return JSON.parse(decodeURIComponent(c.substring(nameEQ.length, c.length)));
		}
		return null;
	}
	/**
	 * Delete a cookie from the browser
	 * @param name 
	 * cookie name
	 */
	eraseCookie(name: string) {
		document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;';
	}

	eraseCookieFromAllPaths(name: string) {
		// This function will attempt to remove a cookie from all paths.
		var pathBits = location.pathname.split('/');
		var pathCurrent = ' path=';

		// do a simple pathless delete first.
		document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:00 UTC;';

		for (var i = 0; i < pathBits.length; i++) {
			pathCurrent += ((pathCurrent.substring(-1) != '/') ? '/' : '') + pathBits[i];
			document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:00 UTC;' + pathCurrent + ';';
		}
	}
}
