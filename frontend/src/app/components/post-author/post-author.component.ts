import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'carbon-components-angular';
import { RouterModule } from '@angular/router';
import { PostAuthor } from 'src/app/models/post/post-author.model';

@Component({
  selector: 'post-author',
  standalone: true,
  imports: [CommonModule, RouterModule, TooltipModule],
  templateUrl: './post-author.component.html',
  styleUrls: ['./post-author.component.scss']
})
export class PostAuthorComponent {
  @Input() author!: PostAuthor
  @Input() scope:'post'|'comment'|'board' = 'post' // different scopes have different change in term of sizes and functionalities
  boardLink:string = '/board'

  constructor() {
  }

  ngOnInit() {
    if(this.author?.id) {
        this.boardLink += `/${this.author.id.toString()}` // add the id to the board link
    }
  }
} 
