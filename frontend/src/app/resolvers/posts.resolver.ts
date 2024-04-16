import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { BasicResponse } from "../models/basic-response.model";
import { Post } from "../models/post/post.model";
import { UserServices } from "../services/user.service";

/**
 * @description get the last 20 user posts
 * @returns an array of Post
 */
export const PostsResolver: ResolveFn<BasicResponse<Post[]>> = (
    route: ActivatedRouteSnapshot
) => { 
    const id = Number(route.paramMap.get('id'))
    return inject(UserServices).getPosts(id)
}