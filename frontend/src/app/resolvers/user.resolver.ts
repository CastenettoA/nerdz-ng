import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { UserServices } from "../services/user.service";
import { User } from "../models/user/user.model";
import { BasicResponse } from "../models/basic-response.model";

/**
 * @description get the user data from id and return it back to the route that is being loaded
 */
export const UserResolver: ResolveFn<BasicResponse<User>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => { 
    const id = Number(route.paramMap.get('id'))
    return inject(UserServices).user(id)
}