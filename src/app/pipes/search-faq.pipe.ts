import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operator/filter';


@Pipe({name: 'searchFAQ'})
export class SearchFAQPipe implements PipeTransform {

  transform(questions: any[], searchString: string): any[] {
    if(!searchString || searchString.length < 1) {
      return questions;
    }

    let searchRegex = "\\b"+searchString+"\\b";
    let regexObj = new RegExp(searchRegex, "ig");
    let results = this.filter(questions, (question) => {
        let res = regexObj.test(question.q);
        if(res) return res;
        res = regexObj.test(question.a);
        return res;
    });

    if(results.length === 0) {
      return [-1];
    }

    return results;
  }


  filter(array, callback) {
    
       var filtered_array = [];
    
       array.forEach(function (element, index, array) {
           if (callback(element, index, array)) {
               filtered_array.push(element);    
           }
       });
    
       return filtered_array;
    
   };
}