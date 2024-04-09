import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { BasicResponse } from '../models/basic-response.model';
import { Post } from '../models/post/post.model';
import { User } from '../models/user/user.model';
import { PostComment } from '../models/post/post-comments.model';
import { newVote } from '../models/vote.type';
import { Vote } from '../models/vote.model';

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

  /** @description get last user's posts */
  user_post(id:number) {    
    return this.http.get<BasicResponse<Post[]>>(`${env.baseurl}/users/${id}/posts`, { withCredentials: true });
  }

  /** @description Adds a new vote on the current post */
  newUserPostVote(id:number, pid:number, vote:newVote) {    
    return this.http.post<BasicResponse<Vote>>(`${env.baseurl}/users/${id}/posts/${pid}/votes`, { vote },  { withCredentials: true });
  }

  /** @description get a single post by pid */
  getPost(id:number, pid:number) {
    return this.http.get<BasicResponse<Post>>(`${env.baseurl}/users/${id}/posts/${pid}`, { withCredentials: true });
  }

  /** @description Get the comments of a single post 
   * @id the user id
   * @pid the post id
   * @n the number of comment to be returned (aka limit), 20 by default
  */
    getPostComments(id:number, pid:number, n:number = 20) {
      const _n:string = n ? `n=${n}` : ''
      return this.http.get<BasicResponse<PostComment[]>>(`${env.baseurl}/users/${id}/posts/${pid}/comments?${_n}`, { withCredentials: true });
  
    }
}
