import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicResponse } from 'src/app/models/basic-response.model';
import { Post } from 'src/app/models/post/post.model';
import { PostsListComponent } from '../posts-list/posts-list.component';
import { ActivatedRoute, Data } from '@angular/router';
import { UserDescriptionComponent } from '../user-description/user-description.component';
import { PostComponent } from '../post/post.component';
import { User } from 'src/app/models/user/user.model';
type BoardContext = 'posts_list' | 'single_post'

@Component({
  selector: 'board',
  standalone: true,
  imports: [CommonModule, PostsListComponent, PostComponent, UserDescriptionComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  context: BoardContext = 'posts_list'
  user!: BasicResponse<User>
  post!: BasicResponse<Post>
  posts!:BasicResponse<Post[]>
  
  constructor(
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((res:Data) => { 
      this.user = res['user'] as BasicResponse<User> // the current board user

      if(res['posts']) {
        // we save the post[] and set context to display the user posts list
        this.posts = res['posts'] as BasicResponse<Post[]> // the current posts or post lists
        this.context = 'posts_list'
      }
      else if(res['post']) {
        /* we the data.post is populated we are in a sub route like /board/:id/:pid so 
          we load the current post and set 'context' to display only 1 post on the template */
        this.post = res['post'] as BasicResponse<Post> // the current post 
        this.context = 'single_post'
      }
    })
  }

  /** @description get the current board h4 title (posts list or signle post type) */
  getBoardTitle(): string {
    if(this.context === 'posts_list') 
      return `I post di <u>${this.user.data.info.username}</u></u>`
    else
      return `Post <u>#${this.post.data.pid}</u>`
  }
}
