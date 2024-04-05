import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { BasicResponse } from "../models/basic-response.model";
import { Post } from "../models/post/post.model";
import { MeService } from "../services/me.service";

/**
 * @description get the post data from id and return back in to the route that is being loaded
 */
export const PostResolver: ResolveFn<BasicResponse<Post>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => { 
    const pid = Number(route.paramMap.get('pid'))
    return inject(MeService).getPost(pid)
}