import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { BasicResponse } from '../models/basic-response.model';
import { Post } from '../models/post/post.model';
import { User } from '../models/user/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsListServices {
  constructor() { }

    newPost = new BehaviorSubject<Post|undefined>(undefined); // if user add a new post is emitted here. Useful to update the <posts-list> component
    removePost = new BehaviorSubject<Post|undefined>(undefined); // subeject that emit when a post is deleted

}
