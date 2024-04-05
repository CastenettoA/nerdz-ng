import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from 'src/app/models/post/post.model';
import { PostComment } from 'src/app/models/post/post-comments.model';
import { PostAuthor } from 'src/app/models/post/post-author.model';
import { PostAuthorComponent } from '../post-author/post-author.component';
import { RouterModule } from '@angular/router';
import { MeService } from 'src/app/services/me.service';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { SkeletonModule } from 'carbon-components-angular';

@Component({
  selector: 'post-comments',
  standalone: true,
  imports: [CommonModule, PostAuthorComponent, RouterModule, PostCommentComponent, SkeletonModule],
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent {
  @Input() post!:Post
  @Input() comments!:PostComment[]
  @Input() author!:PostAuthor
  commentsOpen = false
  commentsLoading = false

  constructor(private meService: MeService) {}

  ngOnInit() {
    this.commentsLoading = true
    this.loadLastComment()
  }

  /** @description load post comment if there are any */
  loadComments() {
    if(this.post.comments <= 0) return // return if there aren't comment on the post

    if(this.commentsOpen) {
      // close the open comments section
      this.commentsOpen = false
    } else {
      // get comments and open comment sections
      this.commentsOpen = true
      this.commentsLoading = true
      this.meService.getPostComments(this.post.pid).subscribe((res) => {
        this.comments = res.data
        this.commentsLoading = false
      })
    }

  }

  
   /** @description load the last post comment if the post have one and save the post comments */
   loadLastComment() {
    if(this.post.comments <= 0 || ![909, 908, 907].includes(this.post.pid)) {
      // if the post have no comments we return back and not load comments
      this.commentsLoading = false
      return
    } else {
      this.meService.getPostComments(this.post.pid, 1).subscribe((res) => {
        if(res.data) this.comments = res.data
        this.commentsLoading = false
      })
    }
   }
}
