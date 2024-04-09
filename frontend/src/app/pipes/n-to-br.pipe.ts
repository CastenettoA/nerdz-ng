import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description convert \n occurencies on a string to a <br /> html element
 * @todo handle anso the hr tag
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
      return message
    } else {
      return message
    }
  }
}
