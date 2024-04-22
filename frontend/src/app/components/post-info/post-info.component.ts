import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from 'src/app/models/post/post.model';
import { IconModule, IconService } from 'carbon-components-angular';
import { UserServices } from 'src/app/services/user.service';
import { RouterModule } from '@angular/router';
import { PrettyDatePipe } from 'src/app/pipes/pretty-date.pipe';
import { Author } from 'src/app/models/post/author.model';
import { BasicResponse } from 'src/app/models/basic-response.model';
import Badge20 from '@carbon/icons/es/badge/20';
import ThumbsDown16 from '@carbon/icons/es/thumbs-down/16';
import ThumbsUp16 from '@carbon/icons/es/thumbs-up/16';
import ID24 from '@carbon/icons/es/Q/iD/24';
import { newVote } from 'src/app/models/vote.type';
import { Vote } from 'src/app/models/vote.model';
import { PostInfoOverflowMenuComponent } from "../post-info-overflow-menu/post-info-overflow-menu.component";
import { MeService } from 'src/app/services/me.service';
import { User } from 'src/app/models/user/user.model';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'post-info',
    standalone: true,
    templateUrl: './post-info.component.html',
    styleUrls: ['./post-info.component.scss'],
    imports: [CommonModule, RouterModule, PrettyDatePipe, IconModule, PostInfoOverflowMenuComponent]
})
export class PostInfoComponent {
  @Input() post!:Post
  @Input() author!:Author
  modalOpen = false
  postVotes: Vote[]|undefined = undefined
  user!: User

  constructor(
    protected iconService: IconService,
    private meService: MeService,
    private userService: UserServices) {}

  ngOnInit() {
    this.iconService.registerAll([ThumbsUp16, ThumbsDown16, Badge20, ID24])
    this.meService.user$.subscribe((res) => { if(res) this.user = res.data })
  }

  ngClass_postRate(rate:number) {
    return { green: rate > 0, red: rate < 0 }
  } 
  
  /** @description check what vote to add to the post based on post votes  */
  async prepareSendVote(vote:newVote): Promise<void> {

    this.postVotes = (await firstValueFrom(this.userService.getPostVotes(this.author.id, this.post.pid))).data
    let userPrevVote = this.getUserPrevVote()

    if(userPrevVote !== null) {
      // the user already voted: check what value send on back-end 
      if(userPrevVote === 1) {
        if(vote === 1) this.sendVote(0)
        if(vote === -1) this.sendVote(-1)
      } else if (userPrevVote === -1) {
        if(vote === 1) this.sendVote(1)
        if(vote === -1) this.sendVote(0)
      }
    } else {
      /* the user hasn't already voted: add the current vote value (+1/-1) */
         this.userService.newPostVote(this.user.info.id, this.post.pid, vote).subscribe((res:BasicResponse<Vote>) => {
          if(res.success) {
            this.post.rate += vote
          }
        })
    }
  }

  /** 
   * @description check if the user has already voted or not based on postVotes array
   *  */
  getUserPrevVote(): 1|-1|null {
    if(!this.postVotes) return null // there are not votes on the post, can skip the find loop

    let userVote: Vote|undefined = this.postVotes.find( // check if the user has voted already
      (value: Vote) => value.from.id === this.user.info.id)

    if(userVote) return userVote.vote as 1|-1 // cast value because in postVotes there isn't a '0' value 
    else return null
  }

  /** @description add a vote to the current post and update the post.rate value  */
  sendVote(vote:newVote) {
    this.userService.newPostVote(this.user.info.id, this.post.pid, vote).subscribe((res:BasicResponse<Vote>) => {
      if(res.success) {
        // todo: avoid 1 http call and do the math calculation of the vote instead
        this.userService.getPost(this.post.from.id, this.post.pid).subscribe((res) => {
          if(res.data) this.post.rate = res.data.rate
        })
      }
    })
  }
}
