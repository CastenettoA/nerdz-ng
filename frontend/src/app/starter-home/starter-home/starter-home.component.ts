import { Component } from '@angular/core';
import { BasicResponse } from 'src/app/models/basic-response.model';
import { User } from 'src/app/models/user/user.model';
import { MeService } from 'src/app/services/me.service';
import { Oauth2Service } from 'src/app/services/oauth2.service';

@Component({
	selector: 'app-starter-home',
	templateUrl: './starter-home.component.html',
	styleUrls: ['./starter-home.component.scss']
})
export class StarterHomeComponent {
	expanded($event: MouseEvent) {
		throw new Error('Method not implemented.');
	}
	active:boolean = false;
	userLoggedIn:boolean = false;
	hasHamburger:boolean = true;

	constructor(
		private oauth2Service: Oauth2Service, 
		private meService: MeService) { }
		
	ngOnInit() {
		this.initSubs()
	}

	/**
	 * @description init various component subs
	 */
	initSubs() {
		/** check for user access token */
		this.oauth2Service.isLoggedIn.subscribe((isLoggedIn) => {
			isLoggedIn ? this.userLoggedIn = true : this.userLoggedIn = false
		})

		// emit the current user property in the _me BeaviorSubject
		this.meService.me().subscribe((res:any)=> {
			const user = res as BasicResponse<User>
			this.meService._me.next(user)
		})
	}

	login() {
		this.oauth2Service.login()
	}

	logout() {
		this.oauth2Service.logout()
	}
}
