import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from "../posts-list/posts-list.component";
import { NewPostComponent } from "../new-post/new-post.component";
import { GridModule, TagModule } from 'carbon-components-angular';
import { BasicResponse } from 'src/app/models/basic-response.model';
import { Post } from 'src/app/models/post/post.model';
import { User } from 'src/app/models/user/user.model';
import { MeService } from 'src/app/services/me.service';
import { Oauth2Service } from 'src/app/services/oauth2.service';
import { ActivatedRoute, Data } from '@angular/router';
import { UserServices } from 'src/app/services/user.service';
import { firstValueFrom } from 'rxjs';
import { AuthorComponent } from "../author/author.component";
import { Author } from 'src/app/models/post/author.model';
import { SkeletonComponent } from "../skeleton/skeleton.component";
type PostListContext = 'home'|'board';

@Component({
    selector: 'user-home',
    standalone: true,
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.scss'],
    imports: [CommonModule, PostsListComponent, NewPostComponent, GridModule, TagModule, AuthorComponent, SkeletonComponent]
})
export class UserHomeComponent {
  userLoggedIn: boolean = false;
  context: PostListContext = 'home'
  posts: BasicResponse<Post[]> | undefined = undefined
  postsLurkedByUser: Post[] = []
  user!: User
  online_followers: User[] = []

  constructor(
	 	private activatedRoute: ActivatedRoute,
		private oauth2Service: Oauth2Service,
		private meService: MeService,
		private userService: UserServices) { }

	async ngOnInit() {
		this.initSubs()

		// get actual logged-user infos
		this.meService.user$.subscribe((res) => { if(res) this.user = res.data })

		// get user online followers
		this.online_followers = await this.meService.following_online()
	}

	/**
	 * @description init various component subs
	 */
	initSubs() {
		/** check for user access token */
		this.oauth2Service.isLoggedIn.subscribe((isLoggedIn) => {
			isLoggedIn ? this.userLoggedIn = true : this.userLoggedIn = false
		})

		this.activatedRoute.data.subscribe( async (res:Data) => {
			if(res['posts'] && res['posts'].data) {

				// save locally the post[]
				const _res = res['posts']

				// iterate post[]
				for(let post of _res.data) {

					// skip if the post have not lurk
					if(post.lurkers <= 0) continue

					// get the post lurks 
					const service = this.userService.getPostLurks(post.from.id, post.pid)
					const post_lurks = (await firstValueFrom(service)).data

					// check if the current user is in the lurk list
					const isCurrentUser = post_lurks.find((element) =>  element.from.id === this.user.info.id)

					if(isCurrentUser) {

						// the user has lurked the current post so:
						// 1. get the index of the post that will be removed
						let postIndex = _res.data.findIndex((homePost: Post) => homePost.pid === post.pid)
						

						// 2. remove the post from post[]
						if (postIndex && postIndex !== -1) {
							 _res.data.splice(postIndex, 1)
						}

						// 3. add the post to the current user post lurked list
						this.postsLurkedByUser.push(post)
					}
				}

				// assign locally the edited post[] to show the <posts-list> on the /home page
				this.posts = _res
			}
		})
	}

	getAuthorFromUser(user:User): Author {
		return {
			username: user.info.username,
			image: user.info.image,
			id: user.info.id,
			online: user.personal.online
		}
	}

	getAuthorFromPost(post:Post): Author {
		return {
			username: post.from.username,
			image: post.from.image,
			id: post.from.id,
			online: undefined
		}
	}

	/** @description unlurk the selected post  */
	unLurkPost(post: Post) {
		throw new Error('Method not implemented.');
	}

	login() {
		this.oauth2Service.login()
	}

	logout() {
		this.oauth2Service.logout()
	}
}
