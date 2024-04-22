import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'carbon-components-angular';
import { RouterModule } from '@angular/router';
import { PostAuthor } from 'src/app/models/post/post-author.model';
type Scope = 'post'|'comment'|'new-comment'|'board'

@Component({
  selector: 'post-author',
  standalone: true,
  imports: [CommonModule, RouterModule, TooltipModule],
  templateUrl: './post-author.component.html',
  styleUrls: ['./post-author.component.scss']
})
export class PostAuthorComponent {
  @Input() author!: PostAuthor // todo: hanlde the case of author is undefined
  @Input() reactivity:boolean = true
  @Input() scope:Scope = 'post' // different scopes have different change in term of sizes and functionalities
  boardLink:string = '/board'

  constructor() {
  }

  ngOnInit() {
    if(this.author?.id) {
        this.boardLink += `/${this.author.id.toString()}` // add the id to the board link
    }
  }

  /** @description return the board link in we are in the reactivity mode altrought return null to block routing */
  getBoardLink() {
    return this.reactivity ? this.boardLink : null
  }

  getClasses() {

    // set reactivity class
    let classes:any = { 'disable-reactivity': !this.reactivity }

    // dynamically set the scope class
    classes[this.getScopeClass()] = true;
    return classes
  }

  getScopeClass() { // todo...
    return 'scope--post'
  }
} 


// <!-- 
//     'scope--post':true 
//     'scope--board':true
//     'scope--comment':true
//     'scope--comment':true
// -->