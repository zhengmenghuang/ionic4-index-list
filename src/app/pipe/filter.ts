import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], key, field): any {
    return key ?
      items.filter(n => {
        return JSON.stringify(n).toString().indexOf(key) > -1;
      }) : items;
  }
}

