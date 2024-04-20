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
  postsLurkedByUser: Post[] = []
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

		this.activatedRoute.data.subscribe( async (res:Data) => {
			if(res['posts'] && res['posts'].data) {

				// save locally the post[]
				const _res = res['posts']

				// iterate post[]
				for(const post of _res.data) {

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

	// /** @description check current user post lurks  */
	// checkUserPostLurks() {
	// 	// find lurked post of the current user
	// 	const lurkedPost = this.posts?.data.filter(this.lurkedPost)
	// 	const currentUser_lurkedPost = lurkedPost?.filter(this.lurkedPost_byCurrentUser)

	// 	if(lurkedPost) console.log(lurkedPost)
	// 	if(currentUser_lurkedPost) console.log(currentUser_lurkedPost)
	// }

	// // find lurked post from a Post[]
	// lurkedPost = (post:Post): Boolean => { return (post.lurkers && !post.closed) ? true : false }

	// // find current user lurked post from a Post[]
	// lurkedPost_byCurrentUser = async (post:Post): Promise<Boolean> => {
	// 	const service = this.userService.getPostLurks(post.from.id, post.pid)
	// 	const postLurkers = await firstValueFrom(service)
	// 	const isFromCurrentUser = (element:Lurk) => element.from.id === this.user.info.id
	// 	return postLurkers.data.find(isFromCurrentUser) ? true : false
	// }

	login() {
		this.oauth2Service.login()
	}

	logout() {
		this.oauth2Service.logout()
	}
}
