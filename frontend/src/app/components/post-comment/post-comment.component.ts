import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Author } from 'src/app/models/post/author.model';
import { PostComment } from 'src/app/models/post/post-comments.model';
import { RouterModule } from '@angular/router';
import { AuthorComponent } from '../author/author.component';
import { PrettyDatePipe } from 'src/app/pipes/pretty-date.pipe';
import { Post } from 'src/app/models/post/post.model';
import { BBCodePipe } from "../../pipes/bbcode.pipe";
import { NToBrPipe } from "../../pipes/n-to-br.pipe";
import { PostCommentActionsComponent } from "../post-comment-actions/post-comment-actions.component";
import { ButtonModule, IconModule, IconService } from 'carbon-components-angular';
import Badge16 from '@carbon/icons/es/badge/16';

@Component({
    selector: 'post-comment',
    standalone: true,
    templateUrl: './post-comment.component.html',
    styleUrls: ['./post-comment.component.scss'],
    imports: [CommonModule, RouterModule, IconModule, AuthorComponent, PrettyDatePipe, ButtonModule, BBCodePipe, NToBrPipe, PostCommentActionsComponent]
})
export class PostCommentComponent {
  @Input() post!:Post
  @Input() comment!:PostComment
  @Input() author!:Author

  @Output() remove:EventEmitter<PostComment> = new EventEmitter()
  @Output() edit:EventEmitter<PostComment> = new EventEmitter()

  constructor(protected iconService: IconService) {}

  ngOnInit() {
    this.iconService.registerAll([Badge16])
    const from = this.comment.from

    if(from) {
      this.author = {
        id: from.id,
        username: from.username,
        image: from.image,
        online: undefined
      }
    }

  }

  userRegex: RegExp = /\[user\](\s\S*?)\[\/user\]/g
  quoteRegex: RegExp = /\[commentquote/

  processMsg(): any {
    return this.comment.message
  }

  //check if the comment in a response to other comment
  isQuotedMsg(msg:string): boolean {
    let res = msg.match(this.quoteRegex)


    if (res)
     { 
      
      return true}
    else
      return false
  }

    /** @description dispatch edit comment event */
    dispatchEditComment(comment:PostComment) {
      this.edit.next(comment)
    }

    /** @description dispatch remove comment event */
    dispatchRemoveComment(comment:PostComment) {
      this.remove.next(comment)
    }
}
