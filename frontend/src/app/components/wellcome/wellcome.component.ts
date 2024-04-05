import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Oauth2Service } from 'src/app/services/oauth2.service';
import { ButtonModule, GridModule, IconModule, IconService, TagModule } from 'carbon-components-angular';
import ArrowRight20 from '@carbon/icons/es/arrow--right/20';

@Component({
  selector: 'wellcome',
  standalone: true,
  imports: [CommonModule, RouterModule, IconModule, ButtonModule, GridModule, TagModule],
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.scss']
})
export class WellcomeComponent {
  imgUrl:string = 'url(assets/images/wellcome-programmer.jpg)' // the aspect ratio of img is 1.77
  isLoggedIn = false

	constructor(
		private oauth2Service: Oauth2Service,
    protected iconService: IconService) { } 
    
  ngOnInit() {
    this.iconService.registerAll([ArrowRight20])
    this.oauth2Service.isLoggedIn.subscribe((res) => { this.isLoggedIn = res })
  }

  login() {
		this.oauth2Service.login()
	}
}
