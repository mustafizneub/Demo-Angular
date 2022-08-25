import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})

export class CommonService {
	rootURL: string = "";
	baseURL: string = "";
	imageURL: string = "";
	socketUrl: string = "";
	getIp: string = "";
	app_module_id: string = "";
	secretKey: string = "";
	baseDomain: string = "";
	idom: string = "";
	version: string = "";
	platform_id: string = "";
	domain: string = "";
	short_name: string = "";
	request: number = 0;
	currency_symbol: string = "";
	currency_code: string = "";
	country_id: string = "";
	country_code: string = "";
	country_calling_code: string = "";
	reCaptcha: boolean = false;
	dineInRecaptcha: boolean = false;
	serverType: string = "";
	promotionalSms: boolean = false;
	indty: number = 0;
	edom: string = '';
	weOrApp: string = 'web';
	f: string = "";
	s: string = "";


	private configUrl: string = "/assets/config/config.json";
	constructor(
		private httpClient: HttpClient
	) { }

	public getConfigFile() {
		let promise = this.httpClient.get(this.configUrl).toPromise().then((data: any) => {
			this.setIntoVariable(data);
		});
		return promise;
	}

	setIntoVariable(res: any) {
		this.baseURL = res.bdom + "/eat";
		this.rootURL = res.bdom;
		this.socketUrl = res.bdom;
		this.getIp = res.bdom + "/getIP";
		this.app_module_id = res.app_module_id;
		this.imageURL = res.edom;
		this.secretKey = res?.sKey;
		this.idom = res?.idom;
		this.version = res?.version,
		this.baseDomain = window.location.origin;
		this.platform_id = res?.platform_id;
		this.domain = res?.domain;
		this.short_name = res?.short_name;
		this.request = res?.request;
		this.currency_symbol = res?.currency_symbol;
		this.currency_code = res?.currency_code;
		this.country_id = res?.country_id;
		this.country_code = res?.country_code;
		this.country_calling_code = res?.country_calling_code;
		this.reCaptcha = res?.reCaptcha;
		this.dineInRecaptcha = res?.dineInRecaptcha;
		this.serverType = res?.serverType;
		this.promotionalSms = this.promotionalSms;
		this.indty = res?.indty;
		this.edom = res?.edom;
		this.f = res?.f;
		this.s = res?.s;
	}

}
