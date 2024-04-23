import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'carbon-components-angular';
import { PostComponent } from "../post/post.component";
type SkeletonType = 'posts-list'|'users-list'


@Component({
    selector: 'skeleton',
    standalone: true,
    templateUrl: './skeleton.component.html',
    styleUrls: ['./skeleton.component.scss'],
    imports: [CommonModule, SkeletonModule, PostComponent]
})
export class SkeletonComponent {
  type: SkeletonType = 'posts-list';
}
