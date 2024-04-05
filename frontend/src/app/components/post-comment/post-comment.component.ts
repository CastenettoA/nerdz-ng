import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostAuthor } from 'src/app/models/post/post-author.model';
import { PostComment } from 'src/app/models/post/post-comments.model';
import { RouterModule } from '@angular/router';
import { PostAuthorComponent } from '../post-author/post-author.component';
import { PrettyDatePipe } from 'src/app/pipes/pretty-date.pipe';

@Component({
  selector: 'post-comment',
  standalone: true,
  imports: [CommonModule, RouterModule, PostAuthorComponent, PrettyDatePipe],
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent {
  @Input() comment!:PostComment
  @Input() author!:PostAuthor

  constructor() {}

  ngOnInit() {
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
    // // const isQuotedMsg =  this.isQuotedMsg(msg)
    // // if(!isQuotedMsg) return msg // return the msg if is a normal comment

    console.log('exec processMsg')
    return this.comment.message
  }

  //check if the comment in a response to other comment
  isQuotedMsg(msg:string): boolean {
    let res = msg.match(this.quoteRegex)


    if (res)
     { 
      
    console.log(msg.length, res[0])
    console.log('---------------')
      return true}
    else
      return false
  }
}
