import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'carbon-components-angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'page-not-found',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

}
