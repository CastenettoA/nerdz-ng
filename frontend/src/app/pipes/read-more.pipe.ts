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

    const msg_withoutHtml = message.replace(this.htmlTagRegex, '')
    // todo assign 50c to <br> to uniform messages output.

    if(msg_withoutHtml.length > 560) {
      const msg_portion = this.trim_msg_preserving_html_tags(message, 560)
      return  `${msg_portion} ` 
    } else {
      return message
    }
  }

    /**
   * @description trim a string by maxLength preserving the html tag inside it
   * @todo
   *     1. handle nested bbcode link [big][b]text[/b][/big]
   *     1.5 it's breaks on <br/>!!
   *     2. handle not closed html tag */
    trim_msg_preserving_html_tags(msg: string, maxLength: number): string {
      let length = 0
      let msg_portion = '' 

      for(let i=0; i < msg.length; i++) {
        if(msg[i] === '<') { // check start of an html tag

          const openingTag_index = msg.indexOf('>', i) // find the index of the opening html tag
          const closingTag_index_firstPart = msg.indexOf('</', i) // find the position of the first part of the html end tag
          const closingTag_index_finalPart = msg.indexOf('>', closingTag_index_firstPart) // find the position of the last part of the html end tag

          if(openingTag_index !== -1 && closingTag_index_firstPart !== -1) {
            const tag = msg.slice(i, closingTag_index_finalPart + 1) // get the tag (e.g. <b>...</b>)
            msg_portion += tag  // add the tag
            i = closingTag_index_finalPart // move the cursor in the right position
            length += tag.length
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