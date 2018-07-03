import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'properties'
})
export class PropertiesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
