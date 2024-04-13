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
  user(id: number) {    
    /* no need to unsubscribe from the observale, the HttpClient class verbs are cold by design.
       Remember that HttpClient do not return the full response but only the response body; if full response needed (headers, status code) it can be requested with ", { observe: 'response'}" */
    return this.http.get<BasicResponse<User>>(`${env.baseurl}/users/${id}`, { withCredentials: true });
  }

  /** @description get last user's posts */
  user_post(id: number) {    
    return this.http.get<BasicResponse<Post[]>>(`${env.baseurl}/users/${id}/posts`, { withCredentials: true });
  }

  /** @description Adds a new vote on the current post */
  newUserPostVote(id: number, pid: number, vote: newVote) {    
    return this.http.post<BasicResponse<Vote>>(`${env.baseurl}/users/${id}/posts/${pid}/votes`, { vote },  { withCredentials: true });
  }

  /** @description get a single post by pid */
  getPost(id: number, pid: number) {
    return this.http.get<BasicResponse<Post>>(`${env.baseurl}/users/${id}/posts/${pid}`, { withCredentials: true });
  }

  /** 
   * @description get n comments of a single post 
   * @id the user id
   * @pid the post id
   * @n the number of comment to be returned (aka limit), 20 by default
  */
  getPostComments(id: number, pid: number, n: number = 20) {
    const _n:string = n ? `n=${n}` : ''
    return this.http.get<BasicResponse<PostComment[]>>(`${env.baseurl}/users/${id}/posts/${pid}/comments?${_n}`, { withCredentials: true });
  }
  
  /** 
   * @description add a comment on a post 
   * @id the user id of the current post
   * @pid the post id where insert the comment
   * @message the comment message to insert on the post
  */
  addPostComment(id: number, pid: number, message: string) {
    return this.http.post<BasicResponse<PostComment>>(`${env.baseurl}/users/${id}/posts/${pid}/comments`, { message },  { withCredentials: true });
  }

  /** 
   * @description edit a comment on a post 
   * @id the user id of the current post
   * @pid the post id where edit the comment
   * @cid the comment id to edit
   * @message the edited comment message 
  */
  editPostComment(id: number, pid: number, cid: string, message: string) {
    return this.http.put<BasicResponse<PostComment>>(`${env.baseurl}/users/${id}/posts/${pid}/comments/${pid}`, { message },  { withCredentials: true });
  }

  /** 
   * @description delete a comment on a post 
   * @id the user id of the current post
   * @pid the post id where delete the comment
   * @cid the comment id to delete
  */
  deletePostComment(id: number, pid: number, cid:  number) {
    return this.http.delete<BasicResponse<PostComment>>(`${env.baseurl}/users/${id}/posts/${pid}/comments/${cid}`,  { withCredentials: true });
  }

  /** 
   * @description add a lurks on the current post
   * @id the user id
   * @pid the post id
   */
  addPostLurks(id: number, pid: number) {
    return this.http.post<BasicResponse<Post>>(`${env.baseurl}/users/${id}/posts/${pid}/lurks`, null, { withCredentials: true });
  }

  /** 
   * @description remove a lurks from the current post
   * @id the user id
   * @pid the post id
   */
    deletePostLurks(id:number, pid:number) {
      return this.http.delete<BasicResponse<null>>(`${env.baseurl}/users/${id}/posts/${pid}/lurks`, { withCredentials: true });
    }
}
