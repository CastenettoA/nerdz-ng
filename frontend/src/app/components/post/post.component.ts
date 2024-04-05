import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostAuthorComponent } from '../post-author/post-author.component';
import { ButtonModule, CodeSnippetModule, GridModule, InputModule, TagModule } from 'carbon-components-angular';
import { Post } from 'src/app/models/post/post.model';
import { PostAuthorsComponent } from "../post-authors/post-authors.component";
import { PostAuthor } from 'src/app/models/post/post-author.model';
import { PostInfoComponent } from '../post-info/post-info.component';
import { PostCommentsComponent } from '../post-comments/post-comments.component';
import { MeService } from 'src/app/services/me.service';
import { PostComment } from 'src/app/models/post/post-comments.model';
import { BBCodePipe } from 'src/app/pipes/bbcode.pipe';
import { AsyncTestPipe } from "../../pipes/async-test.pipe";
@Component({
    selector: 'post',
    standalone: true,
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    imports: [CommonModule, PostAuthorComponent, GridModule, InputModule, ButtonModule, TagModule,
        PostInfoComponent, PostAuthorsComponent, PostCommentsComponent, CodeSnippetModule, BBCodePipe, AsyncTestPipe]
})
export class PostComponent {
  @Input() post!:Post
  author!:PostAuthor

  constructor() {}

  ngOnInit() { 
    if(this.post) {
      this.author = {
        image: this.post.from.image,
        id: this.post.from.id,
        username: this.post.from.username
      }
    }
  }
  
}
