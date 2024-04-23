import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfo } from 'src/app/models/user/user-info.model';
import { Author } from 'src/app/models/post/author.model';
import { AuthorComponent } from '../author/author.component';
import { IconModule, IconService } from 'carbon-components-angular';
import Calls20 from '@carbon/icons/es/calls/20';

@Component({
  selector: 'post-authors',
  standalone: true,
  imports: [CommonModule, AuthorComponent, IconModule],
  templateUrl: './post-authors.component.html',
  styleUrls: ['./post-authors.component.scss']
})
export class PostAuthorsComponent {
  @Input() from!:Author
  @Input() to!:Author
  @Input() scope:'post'|'comment'|'board' = 'post'
  
  showSingleAuthor = true
  authorFrom!:Author
  authorTo!:Author

  constructor(protected iconService: IconService) {}

  ngOnInit() {
    this.iconService.registerAll([Calls20])
    if(this.from && this.to) {

      // check for equality. If 'from' and 'to' are equal the author is posting in his personal board
      if(JSON.stringify(this.from) === JSON.stringify(this.to)) {
        this.showSingleAuthor = true
      } else {
        this.showSingleAuthor = false
        this.setAuthors()
      }
    }
  }

  setAuthors() {
    this.authorFrom = {
      image: this.from.image,
      id: this.from.id,
      username: this.from.username,
      online: undefined
    }

    if(!this.showSingleAuthor) {
      this.authorTo = {
        image: this.to.image,
        id: this.to.id,
        username: this.to.username,
        online: undefined
      }
    }
  }
}
