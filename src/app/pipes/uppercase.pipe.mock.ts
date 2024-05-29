import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'uppercase', pure: false})
export class UppercasePipeMock implements PipeTransform {
    transform(value: string): string {
        return value ? value.toUpperCase() : '';
    }
}
