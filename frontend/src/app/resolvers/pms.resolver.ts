import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { BasicResponse } from "../models/basic-response.model";
import { MeService } from "../services/me.service";

/**
 * @description get the user data from id and return it back to the route that is being loaded
 */
export const PmsResolver: ResolveFn<BasicResponse<any>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => { 
    return inject(MeService).pms()
}