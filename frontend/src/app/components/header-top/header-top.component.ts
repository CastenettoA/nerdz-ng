import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule, HeaderModule, NavigationItem, PlaceholderModule, SearchModule, SideNavModule, TagModule } from 'carbon-components-angular';
import { Oauth2Service } from 'src/app/services/oauth2.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'header-top',
  standalone: true,
  imports: [CommonModule, SideNavModule, PlaceholderModule, DialogModule, HeaderModule, TagModule, SearchModule, RouterModule],
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss']
})
export class HeaderTopComponent {
  // header menu
  // @Input() headerItems: NavigationItem[] = [];
  active:boolean = false;
	userLoggedIn:boolean = false;
	hasHamburger:boolean = true;
  headerItems:NavigationItem[] = [
    { type: "item", title: "Progettix", href:"#pr1" },
    { type: "item", title: "Secondo Link", href:"#pr2" },
  ]
  searchOpened = false

  changeSearchBarStatus(status:boolean) {
    this.searchOpened = status
  }

  constructor(private oauth2Service:Oauth2Service) {}

  ngOnInit() {
    this.oauth2Service.isLoggedIn.subscribe((val:boolean) => { this.userLoggedIn = val }) // listen the user logged in status
  }
  
  expanded($event: MouseEvent) {
		throw new Error('Method not implemented.');
	}

  // overflow menu
  open:boolean = false;
  flip:boolean = false;

  selected($event: MouseEvent) {
		throw new Error('Method not implemented.');
	}

  click($event: MouseEvent) {
		throw new Error('Method not implemented.');
	}

  logout() {
    this.oauth2Service.logout()
  }
}
