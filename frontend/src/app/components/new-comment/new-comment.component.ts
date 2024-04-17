import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostAuthor } from 'src/app/models/post/post-author.model';
import { Post } from 'src/app/models/post/post.model';
import { PostAuthorComponent } from '../post-author/post-author.component';
import { RouterModule } from '@angular/router';
import { MeService } from 'src/app/services/me.service';
import { FormsModule } from '@angular/forms';
import { InputModule, ButtonModule } from 'carbon-components-angular';
import { BasicResponse } from 'src/app/models/basic-response.model';
import { NewCommentForm } from 'src/app/models/forms/new-comment.model';
import { UserServices } from 'src/app/services/user.service';
import { PostsListServices } from 'src/app/services/posts-list.service';
import { PostComment } from 'src/app/models/post/post-comments.model';

@Component({
  selector: 'new-comment',
  standalone: true,
  imports: [CommonModule, PostAuthorComponent, RouterModule, InputModule, ButtonModule, FormsModule],
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent {
  @Output() new: EventEmitter<PostComment> = new EventEmitter()
  @Input() post!:Post
  currentUser!:PostAuthor
  textareaOpen:boolean = false
  form:NewCommentForm = { message: undefined }
  
  @Input() commentToEdit:PostComment | undefined
  editMode = false
  
  constructor(private meService:MeService,
    private userService:UserServices) { }

  ngOnInit() {
    this.meService.user$.subscribe((res) => { // todo: subas only 1 time. not usefult stay to listn 
      if(res) {
        this.currentUser = {
          username: res.data.info.username,
          image: res.data.info.image,
          id: res.data.info.id }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.checkForEditingMode(changes)
  }
  
  /** @description check for comment edit mode */
  checkForEditingMode(changes: SimpleChanges) {    
    if(changes['commentToEdit'] && changes['commentToEdit'].currentValue) {
      console.log(changes['commentToEdit'])

      // open textarea and fill it with the comment message info
      this.editMode = true
      this.form.message = changes['commentToEdit'].currentValue['message']
      this.openTextarea()
    }
  }

  /** @description add a comment below a post */
  addComment() {
    let msg = this.form.message
    if(msg && msg.trim() != '') {      
      this.userService.addPostComment(this.post.from.id, this.post.pid, msg).subscribe((res:BasicResponse<PostComment>)=> {
        if(res.data) {
          this.new.next(res.data) // emit event to add comment to comments list
        }

        this.form.message = undefined
        this.closeTextarea()
      })
    }
  }

    /** @description toggle the textarea */
    toggleTextarea() {
      if(this.editMode) return // don't close the textarean on edit mode
      this.textareaOpen = !this.textareaOpen
    }

    /** @description open the textarea */
    openTextarea() {
      this.textareaOpen = !this.textareaOpen
    }

    /** @description close the textarea */
    closeTextarea() {
      this.textareaOpen = false
    }

    /** reset edit mode returing the component to normal status */
    resetEditMode() {
      this.editMode = false
      this.closeTextarea()
      this.commentToEdit = undefined
    }
}
