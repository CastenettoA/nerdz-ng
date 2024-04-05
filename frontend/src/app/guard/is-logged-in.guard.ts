import { inject } from "@angular/core";
import {  ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Oauth2Service } from "../services/oauth2.service";

// function that check that a user is logged in so he can activate the route
export const isLoggedIn:CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => {
    const isLoggedIn = inject(Oauth2Service).isLoggedIn.value
    const url:UrlTree = inject(Router).parseUrl('/') // redirect user to main page

    if(isLoggedIn) return true
    else return url
  }

