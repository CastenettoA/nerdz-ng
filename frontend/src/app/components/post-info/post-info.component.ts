import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from 'src/app/models/post/post.model';
import { IconModule, IconService } from 'carbon-components-angular';
import { UserServices } from 'src/app/services/user.service';
import { RouterModule } from '@angular/router';
import { PrettyDatePipe } from 'src/app/pipes/pretty-date.pipe';
import { PostAuthor } from 'src/app/models/post/post-author.model';
import { BasicResponse } from 'src/app/models/basic-response.model';
import Badge20 from '@carbon/icons/es/badge/20';
import ThumbsDown16 from '@carbon/icons/es/thumbs-down/16';
import ThumbsUp16 from '@carbon/icons/es/thumbs-up/16';
import ID24 from '@carbon/icons/es/Q/iD/24';

@Component({
  selector: 'post-info',
  standalone: true,
  imports: [CommonModule, RouterModule, PrettyDatePipe, IconModule],
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent {
  @Input() post!:Post
  @Input() author!:PostAuthor

  constructor(
    protected iconService: IconService,
    private userService: UserServices
  ) {}

  ngOnInit() {
    this.iconService.registerAll([ThumbsUp16, ThumbsDown16, Badge20, ID24])
  }

  ngClass_postRate(rate:number) {
    return { green: rate > 0, red: rate < 0 }
  }
  
  addVote(type:boolean): void {
    if(type) {
      this.userService.newUserPostVote(this.post.from.id, this.post.pid).subscribe((res:BasicResponse<any>) => {
        if(res.success) {
          // todo: udpate current post.rate value
        }
      })
    }
  }
}
