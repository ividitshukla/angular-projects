import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(array: any[], searchText: string): any {
        if (!array || !searchText || !Array.isArray(array)) {
            return array;
        }
        var lowSearch = searchText.toLowerCase();
        return array.filter(item => {
            let itemKeys;
            itemKeys = Object.keys(item);
            return itemKeys.some(key => {
                if (String(item[key]).toLowerCase().includes(lowSearch)) {
                    return true;
                } else {
                    return false;
                }
            }
            );
        });
    }
}

