import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description 
 */
@Pipe({
    standalone: true,
    name: 'readMore',
})
export class ReadMorePipe implements PipeTransform {
  nRegex: RegExp = /\n/g; // find the \n occurencies (used to substitute the \n with a <br />)
  htmlTagRegex: RegExp = /<(?!br\s*\/?|hr\s*\/?>)[^>]*>/g // find html tag occurencies but skip <br> and <hr>


  constructor() {}

  /** @description  */
  transform(message: string): string {
    if(!message) return message

    // console.log(message, message.length)

    const msg_withoutHtml = message.replace(this.htmlTagRegex, '')
    // todo assign 50c to <br> to uniform messages output.
    // bug: if a split the string in the middle of an html tag it broke evrithing.
    // this can lead to XSS injection. Maybe better think to another approach.


    if(msg_withoutHtml.length > 560) {
      const msg_portion = this.trim_msg_preserving_html_tags(message, 560)
      return  `${msg_portion} <b class="continue-btn">Continua &#8230;</b>` 
    } else {
      return message
    }
  }

  /** @description trim a string by maxLength preserving the html tag inside it */
  trim_msg_preserving_html_tags(msg: string, maxLength: number): string {
    let length = 0
    let msg_portion = ''

    for(let i=0; i < msg.length; i++) {
      if(msg[i] === '<') {
        // find the start of an html tag
        const firstEndTagIndex = msg.indexOf('>', i) // find the first end tag occurrencies
        if(firstEndTagIndex !== -1) {
          const tag = msg.slice(i, firstEndTagIndex + 1) // get the full tag
          msg_portion += tag  // add the tag
          i = firstEndTagIndex // move the cursor in the right position
        }

      } else {
        // normal character
        msg_portion += msg[i]
        length++;
      }

      if(length >= maxLength) {
        break
      }
    }

    return msg_portion
  }
}
