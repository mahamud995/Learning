import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generatePipe'
})
export class GeneratePipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return `Hello ${value}`;
  }

}
