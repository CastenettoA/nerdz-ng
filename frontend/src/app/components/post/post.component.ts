import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from '../author/author.component';
import { ButtonModule, CodeSnippetModule, GridModule, InputModule, TagModule } from 'carbon-components-angular';
import { Post } from 'src/app/models/post/post.model';
import { PostAuthorsComponent } from "../post-authors/post-authors.component";
import { Author } from 'src/app/models/post/author.model';
import { PostInfoComponent } from '../post-info/post-info.component';
import { PostCommentsComponent } from '../post-comments/post-comments.component';
import { BBCodePipe } from 'src/app/pipes/bbcode.pipe';
import { AsyncTestPipe } from "../../pipes/async-test.pipe";
import { NToBrPipe } from "../../pipes/n-to-br.pipe";
import { ReadMorePipe } from "../../pipes/read-more.pipe";
@Component({
    selector: 'post',
    standalone: true,
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    imports: [CommonModule, AuthorComponent, GridModule, InputModule, ButtonModule, TagModule,
        PostInfoComponent, PostAuthorsComponent, PostCommentsComponent, CodeSnippetModule, BBCodePipe, 
        AsyncTestPipe, NToBrPipe, ReadMorePipe]
})
export class PostComponent {
  @Input() post!:Post
  @Input() open:boolean = false // if true the readMore pipe will be removed and the full post will be displayed
  // @ViewChild('postContent') postContent: ElementRef | undefined
  author!:Author

  constructor() {}

  ngOnInit() { 
    if(this.post) {
      this.author = {
        image: this.post.from.image,
        id: this.post.from.id,
        username: this.post.from.username,
        online: undefined
      }
    }
  }

  test() {
    alert(1)
  }

  getFrom(): Author {
    return {
      id: this.post.from.id,
      image: this.post.from.image,
      username: this.post.from.username,
      online: undefined
    }
  }

  getTo(): Author {
    return {
      id: this.post.to.id,
      image: this.post.to.image,
      username: this.post.to.username,
      online: undefined
    }
  }
  
}
