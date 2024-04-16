import { Component } from '@angular/core';
import { BasicResponse } from 'src/app/models/basic-response.model';
import { Post } from 'src/app/models/post/post.model';
import { User } from 'src/app/models/user/user.model';
import { MeService } from 'src/app/services/me.service';
import { Oauth2Service } from 'src/app/services/oauth2.service';
import { UserServices } from 'src/app/services/user.service';
type PostListContext = 'home'|'board';


@Component({
	selector: 'app-starter-home',
	templateUrl: './starter-home.component.html',
	styleUrls: ['./starter-home.component.scss']
})
export class StarterHomeComponent {
	expanded($event: MouseEvent) {
		throw new Error('Method not implemented.');
	}
	active: boolean = false;
	userLoggedIn: boolean = false;
	hasHamburger: boolean = true;
	context: PostListContext = 'home'
	posts!:BasicResponse<Post[]>

	constructor(
		private oauth2Service: Oauth2Service, 
		private meService: MeService,
    	private userService:UserServices) { }
		
	ngOnInit() {
		this.initSubs()
		this.initPostsList(this.context)
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

	  /** @description load user or home posts based on userId value */
	  initPostsList(context: PostListContext): void {
		context === 'home' ? this.loadPosts() : null
	  }
	
	  /** @description load the user home posts */
	  loadPosts() {
		this.meService.home().subscribe((res:any)=> {
		  if(res.data) this.posts = res
		})
	  }
	
	//   /** @description load the current user last posts */
	//   loadUserPosts() { // todo: handle if user have no posts
	// 	this.userService.getPosts(this.userId).subscribe((res:BasicResponse<Post[]>)=> {
	// 	  if(res) this.posts = res
	// 	})
	//   }
}
