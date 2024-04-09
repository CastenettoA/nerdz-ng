import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IconModule, ThemeModule, UIShellModule } from 'carbon-components-angular'; // carbon-components-angular default imports

import it from '@angular/common/locales/it'
registerLocaleData(it)

// Components
import { AppComponent } from './app.component';
import { BreadcrumbMainComponent } from './components/breadcrumb-main/breadcrumb-main.component';
import { HeaderTopComponent } from './components/header-top/header-top.component';
import { registerLocaleData } from '@angular/common';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		AppRoutingModule,
		UIShellModule,
		IconModule,
		ThemeModule,
		HttpClientModule, 
		BreadcrumbMainComponent,
		HeaderTopComponent,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true  },
		{ provide: LOCALE_ID, useValue: 'it'},
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor() {
	}
}
