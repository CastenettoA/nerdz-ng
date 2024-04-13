import { Pipe, PipeTransform } from '@angular/core';
import { OembedServices } from '../services/oembed.service';

/**
 * @description convert bbcode to html code
 * @returns a string that contain the html converted code
 */
@Pipe({
    standalone: true,
    name: 'bbCode',
})
export class BBCodePipe implements PipeTransform {
  BBcodeRegex: RegExp = /\[(\w+)(?:=([^\]]+))?\]((?:(?!\[\/\1\])[\s\S])*)\[\/\1\]/g;

  constructor(private oembedServices: OembedServices) {}

  /** @description convert bbcode string to html code */
  transform(bbCodeMessage: string): string {
    if (bbCodeMessage) {
      return bbCodeMessage.replace(this.BBcodeRegex, (matchContent: string, BBCodeTag: string, BBCodeTagArg: string, BBCodeTagContent: string) : any => {
        switch (BBCodeTag) {
          case "b":
          case "i":
          case "u":
          case "small":
            return `<${BBCodeTag}>${BBCodeTagContent}</${BBCodeTag}>`
          case "cur":
            return `<i>${BBCodeTagContent}</i>`
          case "url":
            if (BBCodeTagArg) {
              return `<a href="${BBCodeTagArg}">${BBCodeTagContent}</a>`;
            } else {
              return `<a href="${BBCodeTagContent}">${BBCodeTagContent}</a>`;
            }
          case "img":
            return `<img src="${BBCodeTagContent}" />`;
          case "code": // todo: add code highlightin
              return `<div class='code-highlight'>
                        <div class='code-highlight__title'>linguaggio: <b>${BBCodeTagArg}</b></div>
                        <pre><code class='code-highlight__content'>${BBCodeTagContent}</code></pre>
                      </div>`             
          case "video":
            // return `<iframe width="560" height="315" src="${BBCodeTagContent}" frameborder="0" allowfullscreen></iframe>`;
            return 'bbcode video tag'
          case "twitter":
            // we need to create a replaceAsync f()
            return matchContent
          default:
            return matchContent;
        }
      });
    } else {
      return bbCodeMessage;
    }
  }
}
