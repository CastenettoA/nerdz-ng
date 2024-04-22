import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, DialogModule, ModalModule, NotificationService, PlaceholderModule } from 'carbon-components-angular';
import { Post } from 'src/app/models/post/post.model';
import { MeService } from 'src/app/services/me.service';
import { UserServices } from 'src/app/services/user.service';
import { Author } from 'src/app/models/post/author.model';
import { PostsListServices } from 'src/app/services/posts-list.service';

@Component({
  selector: 'post-info-overflow-menu',
  standalone: true,
  providers: [NotificationService],
  imports: [CommonModule, ButtonModule, ModalModule, DialogModule],
  templateUrl: './post-info-overflow-menu.component.html',
  styleUrls: ['./post-info-overflow-menu.component.scss']
})
export class PostInfoOverflowMenuComponent {
  @Input() post!:Post
  @Input() author!:Author
  modalOpen = false

  constructor(
    private meServices: MeService,
    private userServices: UserServices,
    protected notificationService: NotificationService,
    private postsListService: PostsListServices
  ) {}

  editPost() {

  }

  /** @description */
  lurksPost() {
      this.userServices.addPostLurks(this.author.id, this.post.pid).subscribe((res) => {
        if(res && res.success) {
          this.postsListService.removePost.next(this.post) // emit removePost subject
        }
      })
  }

  openDeletePostModal() {
    this.modalOpen = true
  }

  /** start a request to delete the current post */
  deletePost() {
    this.meServices.deletePost(this.post.pid).subscribe((res)=> {

      if(res.success) {

        this.modalOpen = false // close modal
        this.postsListService.removePost.next(this.post) // emit removePost subject
        this.notificationService.showToast({ // display a toast to inform the user
          type: "success",
          target: '.notification-container',
          title: "Post cancellato",
          subtitle: `Post con id #${this.post.pid} cancellato correttamente`,
        });
      } else {
        // todo: display error
        this.modalOpen = false
      }
      // todo: close modal on http delete error
    })
  }
}
