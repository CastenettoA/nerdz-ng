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
    this.initPostsList()
    // listen for new post add or remove event  
    this.postsList.newPost.subscribe((post => { if(post) this.addPost(post) }))
    this.postsList.removePost.subscribe((post => { if(post) { this.removePost(post) } }))
  }

  /** @description check if we are in a /board/{userId} on in the front page */
  initPostsList() {
    this.userId ? this.loadUserPosts() : this.loadPosts()
  }

  /** @description load the user home posts */
  loadPosts() {
    this.me.home().subscribe((res:any)=> {
      if(res.data) this.posts = res
    })
  }

  /** @description load the current user last posts */
  loadUserPosts() { // todo: handle if user have no posts
    this.userService.user_post(this.userId).subscribe((res:BasicResponse<Post[]>)=> {
      if(res) this.posts = res
    })
  }

  /** @description add a post at the beginning of the postList array */
  addPost(post:Post) {
    this.posts.data.unshift(post)
  }

  /** @description remove a post from the postList array */
  removePost(post:Post) {
    this.posts.data = this.posts.data.filter((p:Post) => p.pid !== post.pid)
  }
}