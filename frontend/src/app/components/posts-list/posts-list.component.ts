import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PostAuthorComponent } from '../post-author/post-author.component';
import { PostComponent } from '../post/post.component';
import { BasicResponse } from 'src/app/models/basic-response.model';
import { Post } from 'src/app/models/post/post.model';
import { PaginationModule, SkeletonModule } from 'carbon-components-angular';
import { PostsListServices } from 'src/app/services/posts-list.service';
import { firstValueFrom, timer } from 'rxjs';
import { UserServices } from 'src/app/services/user.service';
import { Lurk } from 'src/app/models/lurk.model';
import { User } from 'src/app/models/user/user.model';
import { MeService } from 'src/app/services/me.service';

@Component({
  selector: 'posts-list',
  standalone: true,
  imports: [CommonModule, PostComponent, PostAuthorComponent, SkeletonModule, PaginationModule],
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent{
  @Input() posts!:BasicResponse<Post[]>
  @Input() userId!:number
  user!: User

  constructor(private postsList:PostsListServices, 
    private usersService: UserServices, private meService: MeService) { }

  async ngOnInit() {
    // listen for new post add or remove event  
    this.postsList.newPost.subscribe((post => { if(post) this.addPost(post) }))
    this.postsList.removePost.subscribe((post => { if(post) { this.removePost(post) } }))
		this.meService.user$.subscribe((res) => { if(res) this.user = res.data })

  }


  /** @description add a post at the beginning of the postList array */
  addPost(post:Post) {
    this.posts.data.unshift(post)
  }

  /** @description remove a post from the postList array */
  removePost(post:Post) {
    this.posts.data = this.posts.data.filter((p:Post) => p.pid !== post.pid)
  }

  /** check if a post is lurked */
  async isLurked(post: Post): Promise<boolean> {
    if(post.lurkers > 0) {

      // get post lurkers
      const isFromCurrentUser = (element:Lurk) => element.from.id === this.user.info.id
      const service = this.usersService.getPostLurks(post.from.id, post.pid)
      const lurkers = await firstValueFrom(service)

      const currentUser_lurkedPost = lurkers.data.filter(isFromCurrentUser)
      return currentUser_lurkedPost ? true : false
    } else return false
  }
}

