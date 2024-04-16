import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PostAuthorComponent } from '../post-author/post-author.component';
import { PostComponent } from '../post/post.component';
import { BasicResponse } from 'src/app/models/basic-response.model';
import { Post } from 'src/app/models/post/post.model';
import { PaginationModule, SkeletonModule } from 'carbon-components-angular';
import { PostsListServices } from 'src/app/services/posts-list.service';


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

  constructor(private postsList:PostsListServices) { }

  ngOnInit() {
    // listen for new post add or remove event  
    this.postsList.newPost.subscribe((post => { if(post) this.addPost(post) }))
    this.postsList.removePost.subscribe((post => { if(post) { this.removePost(post) } }))
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

