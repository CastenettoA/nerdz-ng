import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Oauth2Service {
  url:string = 'https://api.nerdz.eu/v1/oauth2/authorize';
  tokenUrl:string = 'https://api.nerdz.eu/v1/oauth2/token';
  isLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 

  constructor(private http: HttpClient, private router:Router) {}

  /**
   * @description start the authorization process
   */
  login() {
    window.location.href = 'https://127.0.0.1:8000/login'
  }

  /**
 * @description log out user from server removing the JWT
 */
  logout() {
    this.http.get(`${env.baseurl}/logout`, { withCredentials: true }).subscribe((res) => {
      localStorage.removeItem('loggedIn');
      this.isLoggedIn.next(false); // dispact the event so observable can react
      this.router.navigateByUrl('/')
    });
  }
}
