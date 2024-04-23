import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from '../author/author.component';
import { Post } from 'src/app/models/post/post.model';
import { ButtonModule, InputModule } from 'carbon-components-angular';
import { MeService } from 'src/app/services/me.service';
import { FormsModule } from '@angular/forms';
import { BasicResponse } from 'src/app/models/basic-response.model';
import { PostsListServices } from 'src/app/services/posts-list.service';
import { Author } from 'src/app/models/post/author.model';
import { NewPostForm } from 'src/app/models/forms/new-post.model';

const _newPost = {
  "bookmarkers": 0,
  "canBookmark": true,
  "canComment": true,
  "canDelete": false,
  "canEdit": false,
  "canLurk": true,
  "closed": false,
  "comments": 1,
  "from": {
      "id": 403,
      "owner": null,
      "name": "Davide",
      "username": "Doch",
      "website": "",
      "image": "https://www.gravatar.com/avatar/0af0626c225c19890aab552268209503",
      "closed": false,
      "type": "user",
      "board": "Doch."
  },
  "hpid": 125327,
  "lang": "it",
  "lurkers": 0,
  "message": "Ciao, che ne pensate? Ho fatto questa bella cosa: [video]https://www.youtube.com/watch?v=YVI6SCtVu4c&amp;t=272s[/video]",
  "news": false,
  "pid": 968,
  "rate": 1,
  "revisions": 0,
  "time": "2024-03-26T15:51:18.962112Z",
  "timestamp": 1711468278,
  "to": {
      "id": 403,
      "owner": null,
      "name": "Davide",
      "username": "Doch",
      "website": "",
      "image": "https://www.gravatar.com/avatar/0af0626c225c19890aab552268209503",
      "closed": false,
      "type": "user",
      "board": "Doch."
  },
  "type": "user",
  "url": "//www.nerdz.eu/Doch.968"
}

@Component({
  selector: 'new-post',
  standalone: true,
  imports: [CommonModule, FormsModule, AuthorComponent, InputModule, ButtonModule],
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {
  textareaOpen:boolean = false
  currentUser!:Author
  form:NewPostForm = { message: undefined }

  constructor(private meService:MeService,
    private postsList:PostsListServices) {}

  ngOnInit() {
    this.meService.user$.subscribe((res) => { // todo: subas only 1 time. not usefult stay to listn 
      if(res) {
        this.currentUser = {
          username: res.data.info.username,
          image: res.data.info.image,
          id: res.data.info.id,
          online: res.data.personal.online
        }
      }
    });
  }

  // add a new user post on Nerdz
  addPost() {
    let msg = this.form.message
    if(msg && msg.trim() != '') {      
      this.meService.newMePost(msg).subscribe((res:BasicResponse<Post>)=> {
        if(res.data) {
          this.postsList.newPost.next(res.data) // emit in the service the new user post 
        }
      })
    }
  }

  // add a post for testing purpose 
  _addPost() {
    const randomMessages = [
      "Life is a journey, not a destination. Enjoy the moment and cherish every experience along the way.",
      "In the midst of winter, I found there was, within me, an invincible summer. And that makes me happy.",
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      "Happiness is not something ready-made. It comes from your own actions.",
      "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
      "The purpose of our lives is to be happy.",
      "Believe you can and you're halfway there.",
      "You are never too old to set another goal or to dream \n a new dream.",
      "Mai troppo tardi per sognare",
      "Credi nel tuo cuore",
      "Vivi la tua vita e lascia vivere",
      "How? But and Why?",
      "... Non so se si può fare \n perchè \n non provarci?"
    ];
    const symbol = ["+","-"]
    const randomNames = ["Nessuno", "Dante", "Virgilio", "Beatrice", "Innominato"]
    const date = new Date()


    _newPost.message = randomMessages[Math.floor(Math.random() * randomMessages.length)]
    _newPost.time = date.toISOString()
    _newPost.from.username = randomNames[Math.floor(Math.random() * randomNames.length)]
    _newPost.from.image = `https://robohash.org/stefans-${_newPost.from.username}` // get a random user image
    _newPost.rate = 0

    this.postsList.newPost.next({..._newPost}) // using spread to clone obj and avoid references
  }
}
