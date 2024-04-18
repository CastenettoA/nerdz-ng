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
import { UserServices } from 'src/app/services/user.service';
import { firstValueFrom } from 'rxjs';
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
  posts_lurked: BasicResponse<Post[]> | undefined = undefined
  user!: User


  constructor(
	 	private activatedRoute: ActivatedRoute,
		private oauth2Service: Oauth2Service,
		private meService: MeService,
		private userService: UserServices) { }
		
	ngOnInit() {
		this.initSubs()
		this.meService.user$.subscribe((res) => { if(res) this.user = res.data })
	}

	/**
	 * @description init various component subs
	 */
	initSubs() {
		/** check for user access token */
		this.oauth2Service.isLoggedIn.subscribe((isLoggedIn) => {
			isLoggedIn ? this.userLoggedIn = true : this.userLoggedIn = false
		})

		this.activatedRoute.data.subscribe((res:Data) => {
			if(res['posts']) {
				this.posts = res['posts']
				this.getPostLurks()
			}
		})
	}

	/** @description check current user post lurks  */
	async getPostLurks() {
		// find current used lurked post
		const userLurkedPost = await this.findLurkedPost()
		console.log(userLurkedPost)
	}

	/** @description function that return all post-lurks on lurked posts */
	postIsLurked = async (post:Post): Promise<Boolean> => {
		if(post.lurkers && post.canLurk) {
			let res = await firstValueFrom(this.userService.getPostLurks(
				post.from.id, 
				post.pid))

				console.log(`post #${post.pid} from @${post.from.username} is lurked by: `, res)
			return true
		} else return false
	}
	async findLurkedPost() {
		return this.posts?.data.filter(this.postIsLurked)
	}

	login() {
		this.oauth2Service.login()
	}

	logout() {
		this.oauth2Service.logout()
	}
}
