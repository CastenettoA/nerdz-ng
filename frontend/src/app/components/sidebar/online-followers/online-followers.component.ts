import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/models/user/user.model';
import { MeService } from 'src/app/services/me.service';
import { TagModule } from 'carbon-components-angular';
import { AuthorComponent } from "../../author/author.component";
import { Author } from 'src/app/models/post/author.model';

@Component({
    selector: 'online-followers',
    standalone: true,
    templateUrl: './online-followers.component.html',
    styleUrls: ['./online-followers.component.scss'],
    imports: [CommonModule, TagModule, AuthorComponent]
})
export class OnlineFollowersComponent {
  online_followers: User[] = []

  constructor(private meService: MeService) { }

   async ngOnInit() {
		// this.initSubs()

		// get actual logged-user infos
		// this.meService.user$.subscribe((res) => { if(res) this.user = res.data })

		// get user online followers
		this.online_followers = await this.meService.following_online()
	}

  getAuthorFromUser(user:User): Author {
		return {
			username: user.info.username,
			image: user.info.image,
			id: user.info.id,
			online: user.personal.online
		}
	}
}
