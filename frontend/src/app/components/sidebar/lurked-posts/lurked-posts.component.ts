import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Author } from 'src/app/models/post/author.model';
import { Post } from 'src/app/models/post/post.model';
import { TagModule } from 'carbon-components-angular';
import { AuthorComponent } from "../../author/author.component";

@Component({
    selector: 'lurked-posts',
    standalone: true,
    templateUrl: './lurked-posts.component.html',
    styleUrls: ['./lurked-posts.component.scss'],
    imports: [CommonModule, TagModule, AuthorComponent]
})
export class LurkedPostsComponent {
  @Input() lurked: Post[] = []

  ngOnInit() {
    
  }

  getAuthorFromPost(post:Post): Author {
		return {
			username: post.from.username,
			image: post.from.image,
			id: post.from.id,
			online: undefined
		}
	}

	/** @description unlurk the selected post  */
	unLurkPost(post: Post) {
		throw new Error('Method not implemented.');
	}
}
