import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostComment } from 'src/app/models/post/post-comments.model';
import { ButtonModule, DialogModule, IconModule, IconService, ModalModule } from 'carbon-components-angular';
import { BasicResponse } from 'src/app/models/basic-response.model';
import { UserServices } from 'src/app/services/user.service';
import TrashCan16 from '@carbon/icons/es/trash-can/16';
import Edit16 from '@carbon/icons/es/edit/16';
import Reply16 from '@carbon/icons/es/reply/16';
import { Post } from 'src/app/models/post/post.model';

@Component({
  selector: 'post-comment-actions',
  standalone: true,
  imports: [CommonModule, IconModule, RouterModule, ButtonModule, ModalModule, DialogModule],
  templateUrl: './post-comment-actions.component.html',
  styleUrls: ['./post-comment-actions.component.scss']
})
export class PostCommentActionsComponent {
  @Input() post!:Post
  @Input() comment!:PostComment
  modalOpen = false

  @Output() edit:EventEmitter<PostComment> = new EventEmitter()
  @Output() remove:EventEmitter<PostComment> = new EventEmitter()

  constructor(private userService: UserServices,
    protected iconService: IconService) {}

  ngOnInit() {
    this.iconService.registerAll([TrashCan16, Edit16, Reply16])
  }

  openModal() {
    this.modalOpen = true
  }

  closeModal() {
    this.modalOpen = false
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
}
