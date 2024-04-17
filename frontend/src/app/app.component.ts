import { Component } from '@angular/core';
import { Oauth2Service } from './services/oauth2.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeType } from 'carbon-components-angular';
import { BasicResponse } from './models/basic-response.model';
import { User } from './models/user/user.model';
import { MeService } from './services/me.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	isLoggedIn:boolean = false
	darkModeOn = true; // cds dark mode true by default

	constructor(private oauth2Service: Oauth2Service, private meService: MeService,
		private route:ActivatedRoute, private router:Router) { }

	ngOnInit() {
		this.checkRouteParam()
		this.prefersColorSchemeCheck()
		this.listenUserStatus()
		this.checkUserStatus()
		this.emitMeInfos()
	}

	checkRouteParam() {
		this.route.queryParamMap.subscribe((query:any) => {
			if(query.get('login')) {
				this.oauth2Service.isLoggedIn.next(true)
				localStorage.setItem('loggedIn', 'yes')
				this.router.navigateByUrl('/home')
			}
		});
	}

	/** @description check user color scheme choice and change cds theme upon of it */
	prefersColorSchemeCheck() {
		if(window.matchMedia('(prefers-color-scheme)').media === 'not all') {
			// prefers-color-scheme is not supported, do nothing.
		} else {
			this.darkModeOn = window.matchMedia('(prefers-color-scheme: dark)').matches // check for dark mode preferences
			// add listener for color-sheme change
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
				this.darkModeOn = e.matches
			})
		}
	}

	/** @description return the current active cds ThemeType */
	currentTheme(): ThemeType {
		return this.darkModeOn ? 'g100' : 'white'
	}

    // subscribe to BeaviorSubject and save the user status (logged-in = true, logged-out = false)
	listenUserStatus() {
		this.oauth2Service.isLoggedIn.subscribe((res) => this.isLoggedIn = res)
	}

	private checkUserStatus() {
		let loggedIn = localStorage.getItem('loggedIn')

		if(!loggedIn) {
			this.oauth2Service.isLoggedIn.next(false)
		} else {
			this.oauth2Service.isLoggedIn.next(true)
		}
	}
	
	emitMeInfos() {
		// emit the current user property in the _me BeaviorSubject
		this.meService.me().subscribe((res:any)=> {
			const user = res as BasicResponse<User>
			this.meService.user$.next(user)
		})
	}
}
