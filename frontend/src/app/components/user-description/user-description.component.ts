import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostAuthorComponent } from "../post-author/post-author.component";
import { BasicResponse } from 'src/app/models/basic-response.model';
import { TagModule } from 'carbon-components-angular';
import { PostAuthor } from 'src/app/models/post/post-author.model';
import { User } from 'src/app/models/user/user.model';
import { RouterModule } from '@angular/router';

type mergedUserData = {
    [key: string]: any
}

@Component({
    selector: 'user-description',
    standalone: true,
    templateUrl: './user-description.component.html',
    styleUrls: ['./user-description.component.scss'],
    imports: [CommonModule, PostAuthorComponent, TagModule, RouterModule]
})
export class UserDescriptionComponent {
    @Input() user!:BasicResponse<User>
    author!: PostAuthor
    tags!:string[]

    constructor() {}

    ngOnInit() {
        this.buildBoardAuthor()
        this.tags = this.getTags()
        // this.tree = this.getNoteTrees() 
    }


    getTags():string[] {
        const userInfo:mergedUserData = { ...this.user.data.info, ...this.user.data.personal, ...this.user.data.contacts } // get 1 big object from 3 little one
        const tags:string[] = []
        const keyToSkip = ['gravatar', 'image','type','closed','board', 'owner']

        for (const key in userInfo) {
            if(keyToSkip.includes(key)) // check if the loop need to skip a key due the low importance of it
                continue;
            else {
                if(this.isValid(userInfo[key])) {

                    if(key === 'birthday')
                        userInfo[key] = userInfo[key].split('T')[0] // get only useful part of the birth date

                    tags.push(`${key} • ${userInfo[key]}`) // add the element to the tags array
                }
            }
        }

        if(tags.length === 0) 
            return ['Non c\'è niente di interessante qui.']
        else
            return tags
    }

    // check if the key have a value, if not (void or void array) so skip it, if yes include it in the current tags array
    isValid(userInfo:string | string[]):boolean { 
        if(Array.isArray(userInfo) && userInfo.length === 1 && userInfo[0] === '') 
            return false
        else if(!userInfo)
            return false
        else
            return true
    }

    buildBoardAuthor() {
        this.author = { 
            username: this.user.data.info.username,
            image: this.user.data.info.image,
            id: this.user.data.info.id,
        }
    }
}
