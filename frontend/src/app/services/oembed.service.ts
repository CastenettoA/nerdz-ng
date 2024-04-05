import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OEmbedResponse } from '../models/oembed.model';
type twetterTheme = 'light'|'dark'
import { environment as env } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OembedServices {
  constructor(private http: HttpClient) { }

  /** @description Returns a single Tweet, specified by either a Tweet web URL or the Tweet ID, in an oEmbed-compatible format. 
   * @url The URL of the Tweet to be embedded
   * @param [theme='light'] When set to dark, the Tweet is displayed with light text over a dark background. todo: link this to cds theme color
   */
  twitter(url:string, theme:twetterTheme = 'light'): Observable<OEmbedResponse> {    
    return this.http.get<OEmbedResponse>(`${env.baseurl}/oembed/twitter?url=${url}&theme=${theme}`, { withCredentials: true })
  }

  // getTwitterHtmlbyUrl(url: string) {
  //   let html = ""
  //   await (await this.twitter(url)).subscribe((res) => {
  //     html = res.html
  //   })

  //   return html
  // }
}
