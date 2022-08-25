import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonService } from './services/common.service';
import { CacheService } from './services/cache.service';
import { TokenInterceptor } from './interceptors/Http.interceptor';
import { HttpErrorInterceptor } from './interceptors/error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from './services/cookie.service';
export function initConfigInfo(urlList: CommonService) {
	return () => urlList.getConfigFile();
}

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent
	],
	imports: [
		CommonModule
	],
	providers:[
		{ provide: APP_INITIALIZER, useFactory: initConfigInfo, deps: [CommonService], multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
		CommonService,
		CacheService,
		CookieService
	]
})
export class CoreModule { }
