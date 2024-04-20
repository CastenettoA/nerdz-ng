import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { User } from '../models/user/user.model';
import { BehaviorSubject, firstValueFrom, pipe, throwError } from 'rxjs';
import { BasicResponse } from '../models/basic-response.model';
import { Post } from '../models/post/post.model';
import { PostComment } from '../models/post/post-comments.model';
import { Pm } from '../models/pms.model';

@Injectable({
  providedIn: 'root'
})
export class MeService {
  user$:BehaviorSubject<BasicResponse<User> | undefined> = new BehaviorSubject<BasicResponse<User> | undefined>(undefined);
  // user!: User

  constructor(private http: HttpClient) { 
    // this.user$.subscribe((res) => { if(res) this.user = res.data })
  }

  /** @description Shows the basic informations for the specified user */
  me() {    
    return this.http.get(`${env.baseurl}/me`, { withCredentials: true })
  }

  /** @description Shows the homepage of the current user, mixing projects and users posts */
  home() {    
    return this.http.get<BasicResponse<Post[]>>(`${env.baseurl}/me/home`, { withCredentials: true })
  }

  /** @description Shows the followers information for the specified user */
  followers() {    
    return this.http.get(`${env.baseurl}/me/followers`, { withCredentials: true });
  }

  /** @description Shows the following information for the specified user */
  following() {    
    return this.http.get<BasicResponse<User[]>>(`${env.baseurl}/me/following/users`, { withCredentials: true });
  }

  /** @description Shows the online following users for the specified user */
  async following_online() {
    
    // get user followers
    const followers = await firstValueFrom(this.following())

    // get user online followers and return it
    return followers.data.filter((follower) => follower.personal.online)
  }

  /** @description Adds a new vote on the current post */
  newMePost(message:string) {    
    return this.http.post<BasicResponse<Post>>(`${env.baseurl}/me/posts`, { message },  { withCredentials: true });
  }

  /** @description Get a single post data by pid */
  getPost(pid:number) {
    return this.http.get<BasicResponse<Post>>(`${env.baseurl}/me/posts/${pid}`, { withCredentials: true });
  }

  /** @description delete a single post by pid */
  deletePost(pid:number) {
    return this.http.delete<BasicResponse<null>>(`${env.baseurl}/me/posts/${pid}`, { withCredentials: true });
  }
  
  // /** @description List posts on user board, filtered by some parameters.  */
  // getPosts() {
  //   return this.http.get<BasicResponse<Post[]>>(`${env.baseurl}/me/posts`, { withCredentials: true });
  // }

  /** @description Get the comments of a single post 
   * @pid the post id
   * @n the number of comment to be returned (aka limit), 20 by default
  */
  getPostComments(pid:number, n:number = 20) {
    return this.http.get<BasicResponse<PostComment[]>>(`${env.baseurl}/me/posts/${pid}/comments/${n}`, { withCredentials: true });

  }

  /** @description Shows the list of the private conversation of the current user 
   * @pid the post id
   * @n the number of comment to be returned (aka limit), 20 by default
  */
  pms() {
    return this.http.get<BasicResponse<Pm[]>>(`${env.baseurl}/me/pms`, { withCredentials: true });
  }
}

// todo: remove 'get' before function name in all services (uniform)
