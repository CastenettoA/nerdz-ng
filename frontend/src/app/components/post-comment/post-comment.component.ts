import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostAuthor } from 'src/app/models/post/post-author.model';
import { PostComment } from 'src/app/models/post/post-comments.model';
import { RouterModule } from '@angular/router';
import { PostAuthorComponent } from '../post-author/post-author.component';
import { PrettyDatePipe } from 'src/app/pipes/pretty-date.pipe';
import { ButtonModule, DialogModule, IconModule, IconService, ModalModule } from 'carbon-components-angular';
import Badge16 from '@carbon/icons/es/badge/16';
import TrashCan16 from '@carbon/icons/es/trash-can/16';
import Edit16 from '@carbon/icons/es/edit/16';
import Reply16 from '@carbon/icons/es/reply/16';
import { UserServices } from 'src/app/services/user.service';
import { BasicResponse } from 'src/app/models/basic-response.model';
import { Post } from 'src/app/models/post/post.model';
import { BBCodePipe } from "../../pipes/bbcode.pipe";
import { NToBrPipe } from "../../pipes/n-to-br.pipe";

@Component({
    selector: 'post-comment',
    standalone: true,
    templateUrl: './post-comment.component.html',
    styleUrls: ['./post-comment.component.scss'],
    imports: [CommonModule, RouterModule, ModalModule, DialogModule, PostAuthorComponent, PrettyDatePipe, IconModule, ButtonModule, BBCodePipe, NToBrPipe]
})
export class PostCommentComponent {
  @Input() post!:Post
  @Input() comment!:PostComment
  @Input() author!:PostAuthor
  @Output() remove:EventEmitter<PostComment> = new EventEmitter()
  @Output() edit:EventEmitter<PostComment> = new EventEmitter()
  modalOpen = false

  constructor(protected iconService: IconService,
    private userService: UserServices) {}

  ngOnInit() {
    this.iconService.registerAll([Badge16, TrashCan16, Edit16, Reply16])
    const from = this.comment.from

    if(from) {
      this.author = {
        id: from.id,
        username: from.username,
        image: from.image
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

  /** @description edit the selected comment */
  editComment(comment:PostComment) {
    this.edit.next(comment) // emit the comment to edit
  }

  /** @description try to delete the selected comment */
  deleteComment(comment:PostComment) { // todo: check this!
    this.userService.deletePostComment(/*this.comment.from.id*/2896, this.post.pid, comment.hcid)
      .subscribe((res:BasicResponse<PostComment>) => {
        this.closeModal()
        this.remove.next(comment)
      })
  }

  openModal() {
    this.modalOpen = true
  }

  closeModal() {
    this.modalOpen = false
  }
}
