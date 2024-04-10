import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MeService } from 'src/app/services/me.service';
import { PostAuthorComponent } from '../post-author/post-author.component';
import { PostComponent } from '../post/post.component';
import { BasicResponse } from 'src/app/models/basic-response.model';
import { Post } from 'src/app/models/post/post.model';
import { PaginationModule, SkeletonModule } from 'carbon-components-angular';
import { UserServices } from 'src/app/services/user.service';
import { PostsListServices } from 'src/app/services/posts-list.service';


@Component({
  selector: 'posts-list',
  standalone: true,
  imports: [CommonModule, PostComponent, PostAuthorComponent, SkeletonModule, PaginationModule],
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent{
  posts!:BasicResponse<Post[]>
  @Input() userId!:number

  constructor(private me:MeService,
    private userService:UserServices,
    private postsList:PostsListServices) { }

  ngOnInit() {
    if(this.userId)
      this.loadUserPosts()
    else
      this.loadPosts()

    // listen to newPost subject to add new post to list
    this.postsList.newPost.subscribe((post => {
      if(post) this.posts.data.unshift(post) 
    }))

    // listen to removePost subject to remove deleted post from list
    this.postsList.removePost.subscribe((post => {
      if(post) {
        // todo: before cancell the post from the array hide if we disappearing effects with css and elementRef
        this.posts.data = this.posts.data.filter((p:Post) => p.pid !== post.pid)
      } 
    }))
  }

  // load the user home last posts
  loadPosts() {
    // this.me.home().subscribe((res:any)=> {
    //   if(res.data) this.posts = res
    // })

    this.me.home().subscribe((res:any)=> {
      if(res.data) this.posts = res
    })
  }

  // load the current user last posts
  loadUserPosts() { // todo: handle if user have no posts
    this.userService.user_post(this.userId).subscribe((res:BasicResponse<Post[]>)=> {
      if(res) this.posts = res
    })
  }
}