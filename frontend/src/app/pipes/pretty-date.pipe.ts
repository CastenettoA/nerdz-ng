import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description return a pretty-to-read datetime from a ISO 8601 date like 1994-05-26T00:00:00Z.
 */

@Pipe({
    standalone: true,
    name: 'prettyDate',
})
export class PrettyDatePipe implements PipeTransform {
    dayNames:string[] = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    
    /* postDate: is a ISO 8601 date */
    transform(postDate:string): string {

        const _postDate:Date = new Date(postDate) // the date of the post when published
        const today:Date = new Date() // the today date at midnight
        today.setHours(0,0,0,0) // set midnight

        const yesterday:Date = new Date(today) 
        yesterday.setDate(yesterday.getDate()-1)

        const twoDayAgo = new Date(today)
        twoDayAgo.setDate(twoDayAgo.getDate()-2)

        const treeDayAgo = new Date(today)
        treeDayAgo.setDate(treeDayAgo.getDate()-3)


        const isToday = _postDate >= today ? true : false // check if date of the post is today or not
        const isYesterday = (_postDate < today && _postDate >= yesterday) ? true : false 
        const istwoDayAgo = (_postDate < yesterday && _postDate >= twoDayAgo) ? true : false 
        const istreeDayAgo = (_postDate < twoDayAgo && _postDate >= treeDayAgo) ? true : false 
        const weekDayName = this.dayNames[_postDate.getDay()]

        let date = ''
        if(isToday)
          return date = `Oggi, ${formatDate(postDate, 'mediumTime', 'it')}`  // is like "Oggi, 9:03:01 AM"
        else if(isYesterday)
          return date = `Ieri, ${formatDate(postDate, 'mediumTime', 'it')}`  
        else if(istwoDayAgo) 
          return date = `${weekDayName}, ${formatDate(postDate, 'mediumTime', 'it')}` 
        else if(istreeDayAgo)
          return date = `${weekDayName}, ${formatDate(postDate, 'mediumTime', 'it')}` 
        else  
          return formatDate(postDate, 'medium', 'it') // is like "Jun 15, 2015, 9:03:01 AM"
    }
}