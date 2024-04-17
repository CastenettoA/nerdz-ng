import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { BasicResponse } from "../models/basic-response.model";
import { Post } from "../models/post/post.model";
import { MeService } from "../services/me.service";
import { UserServices } from "../services/user.service";

/**
 * @description get the last 20 posts of the current user
 * @returns an array of Post
 */
export const HomeResolver: ResolveFn<BasicResponse<Post[]>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => { 
    return inject(MeService).home()
}