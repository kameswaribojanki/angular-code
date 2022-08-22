import { Pipe, PipeTransform } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Pipe({
  name: 'filterPipes'
})
export class FilterPipesPipe implements PipeTransform {

  transform(value: any, filteredString:string) :any{
    if(value.length===0 || filteredString===''){
      return value;


    }
    // const categories=[];
    // for(const category of value){
    //   if(category['title']===filteredString){
    //     categories.push(category);
    //   }
    // }
    // return categories;


    if(filteredString.length>3){

      return value.filter(function(search:{
        title:any,
      }){
        return search.title.toLowerCase().indexOf(filteredString) > -1
      })
    }
  }

}
