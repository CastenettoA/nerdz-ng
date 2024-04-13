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
import { UserServices } from 'src/app/services/user.service';
import { NewCommentComponent } from '../new-comment/new-comment.component';

@Component({
  selector: 'post-comments',
  standalone: true,
  imports: [CommonModule, PostAuthorComponent, RouterModule, PostCommentComponent, NewCommentComponent, SkeletonModule],
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent {
  @Input() post!:Post
  @Input() comments!:PostComment[]
  @Input() author!:PostAuthor
  commentsOpen = false
  commentsLoading = false
  commentToEdit:PostComment | undefined = undefined

  constructor(private meService: MeService, private userService: UserServices) {}

  ngOnInit() {
    this.commentsLoading = true
    this.loadLastComment()
  }

  /** @description load post comment if there are any */
  loadComments() {
    if(this.commentsOpen) {
      // close the open comments section
      this.commentsOpen = false
    } else {
      // get comments and open comment sections
      this.commentsOpen = true
      this.commentsLoading = true
      this.userService.getPostComments(this.author.id, this.post.pid).subscribe((res) => {
        this.comments = res.data
        this.commentsLoading = false
      })
    }

  }

  
  /** @description load the last post comment if the post have one and save the post comments */
  loadLastComment() {
  if(this.post.comments <= 0 || ![1, 8712].includes(this.post.pid)) {
    // if the post have no comments we return back and not load comments
    this.commentsLoading = false
    return
  } else {
    this.userService.getPostComments(this.author.id, this.post.pid, 1).subscribe((res) => {
      if(res.data) this.comments = res.data
      this.commentsLoading = false
    })
  }
  }

  /** @description add/remove a comment from the list */
  refreshCommentsList(comment: PostComment, action:'new'|'remove') {
    console.log('comment obj: ', comment)
  if(comment && action === 'new') this.comments.push(comment) // add the comment to comments list
  if(comment && action === 'remove') this.comments = this.comments.filter((c:PostComment) => c.hcid !== comment.hcid) // remove the comment from the comment lists
  }

  /** @description edit the selected comment */
  editComment(comment:PostComment) {
    this.commentToEdit = comment
  }
}
