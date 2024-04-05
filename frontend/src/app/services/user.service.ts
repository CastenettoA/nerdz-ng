import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { BasicResponse } from '../models/basic-response.model';
import { Post } from '../models/post/post.model';
import { User } from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServices {
  constructor(private http: HttpClient) { }

  /** @description get basic informations for the specified user id */
  user(id:number) {    
    /* no need to unsubscribe from the observale, the HttpClient class verbs are cold by design.
       Remember that HttpClient do not return the full response but only the response body; if full response needed (headers, status code) it can be requested with ", { observe: 'response'}" */
    return this.http.get<BasicResponse<User>>(`${env.baseurl}/users/${id}`, { withCredentials: true });
  }

  /** @description get last user post list */
  user_post(id:number) {    
    return this.http.get<BasicResponse<Post[]>>(`${env.baseurl}/users/${id}/posts`, { withCredentials: true });
  }

  /** @description Adds a new vote on the current post */
  newUserPostVote(id:number, pid:number) {    
    return this.http.post<BasicResponse<any>>(`${env.baseurl}/users/${id}/posts/${pid}/votes`, null,  { withCredentials: true });
  }
}
