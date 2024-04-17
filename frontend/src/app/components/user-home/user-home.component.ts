import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from "../posts-list/posts-list.component";
import { NewPostComponent } from "../new-post/new-post.component";
import { GridModule } from 'carbon-components-angular';
import { BasicResponse } from 'src/app/models/basic-response.model';
import { Post } from 'src/app/models/post/post.model';
import { User } from 'src/app/models/user/user.model';
import { MeService } from 'src/app/services/me.service';
import { Oauth2Service } from 'src/app/services/oauth2.service';
import { ActivatedRoute, Data } from '@angular/router';
type PostListContext = 'home'|'board';

@Component({
    selector: 'user-home',
    standalone: true,
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.scss'],
    imports: [CommonModule, PostsListComponent, NewPostComponent, GridModule]
})
export class UserHomeComponent {
  userLoggedIn: boolean = false;
  context: PostListContext = 'home'
  posts: BasicResponse<Post[]> | undefined = undefined

  constructor(
	 	private activatedRoute: ActivatedRoute,
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

		this.activatedRoute.data.subscribe((res:Data) => {
			console.log(res)
			if(res['posts']) this.posts = res['posts']
		})
	}

	login() {
		this.oauth2Service.login()
	}

	logout() {
		this.oauth2Service.logout()
	}
}
