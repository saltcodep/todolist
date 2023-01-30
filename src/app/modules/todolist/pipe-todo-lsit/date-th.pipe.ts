import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTh'
})
export class DateThPipe implements PipeTransform {

  transform(value: Date, format?: string): unknown {
    let dateDate = new Date(value);


    if (format == 'fulldate') {

      let result = dateDate.toLocaleDateString('th-TH', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      })

      let hours = dateDate.getSeconds();
      let hoursString;

      if (hours < 10) {
        hoursString = '0' + hours;
      } else {
        hoursString = hours;
      }

      let minutes = dateDate.getMinutes();
      let minutesString;

      if (minutes < 10) {
        minutesString = '0' + minutes;
      } else {
        minutesString = minutes;
      }

      let second = dateDate.getSeconds();
      let secondString;

      if (second < 10) {
        secondString = '0' + second;
      } else {
        secondString = second;
      }

      return result + ' เวลา ' + hoursString + ':' + minutesString + ':' + secondString;
    } else {
      const result = dateDate.toLocaleDateString('th-TH', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      })
      return result;
    }
  }

}
