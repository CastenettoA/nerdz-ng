import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description convert \n occurencies on a string to a <br /> html element
 */
@Pipe({
    standalone: true,
    name: 'nToBr',
})
export class NToBrPipe implements PipeTransform {
  nRegex: RegExp = /\n/g;

  constructor() {}

  /** @description convert bbcode string to html code */
  transform(message: string): string {
    if(message) {
      message = message.replace(this.nRegex, '<br />')
      console.log(message)
      return message
    } else {
      return message
    }
  }
}
