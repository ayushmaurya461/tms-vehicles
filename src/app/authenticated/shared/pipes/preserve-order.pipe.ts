import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preserveOrderKeyValue',
})
export class PreserveOrderKeyValuePipe implements PipeTransform {
  transform(value: any): any[] {
    if (!value) return [];
    return Object.keys(value).map((key) => ({ key, value: value[key] }));
  }
}
