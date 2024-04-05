import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'carbon-components-angular';
import { ActivatedRoute, RouterModule, UrlSegment } from '@angular/router';

@Component({
  selector: 'breadcrumb-main',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbModule],
  templateUrl: './breadcrumb-main.component.html',
  styleUrls: ['./breadcrumb-main.component.css']
})
export class BreadcrumbMainComponent {
  currentPath: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // subs and save locally the current route path
    this.route.url.subscribe((res: UrlSegment[])=> {
      if(res) {
        this.currentPath = res[0].path;
      }
    });
  }

  // check if the breadcumb item path is equal to the current path
  isCurrent(itemPath:string) {
    let obj = { itemPath, currentPath: this.currentPath}
    if(itemPath === this.currentPath)
      return true
    else 
      return false
  }
}
