import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class UtilServices {
  constructor() { }

    /** @description return a random interval between 1000 and 5000ms */
    getRandomInterval(min?:number, max?:number): number { 
        // todo implement min and max params
        let interval = [1000,2000,3000,4000,5000]
        let n = Math.floor(Math.random()*interval.length)
        return interval[n]
  }
}
