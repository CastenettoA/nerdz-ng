import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { UtilServices } from '../services/util.service';

/**
 * @description return a pretty-to-read datetime from a ISO 8601 date like 1994-05-26T00:00:00Z.
 */

@Pipe({
    standalone: true,
    name: 'asyncTest',
})
export class AsyncTestPipe implements PipeTransform {

    constructor(private utilServices: UtilServices) {}

    /* postDate: is a ISO 8601 date */
    transform(message:string): Promise<any> {
      let int = this.utilServices.getRandomInterval()

      // a promise that after 1000ms resolve returning 'message'
      return new Promise((resolve) => {
        setTimeout(()=> {
          resolve(message)
        }, int)
      })

    }
}