import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasicTasksService {

  constructor() { }

  highlightRequiredFields(){
    $('form').find('input').each(function(){
      if($(this).prop('required')){
          let id = $(this).attr('id');
          $("label[for='"+id+"']").next('span.text-danger').remove();
          $("label[for='"+id+"']").after("<span class='text-danger'>*</span>");
      }
    });
    $('form').find('.select2').each(function(){
      if($(this).attr('required')){
          let id = $(this).attr('id');
          $("label[for='"+id+"']").next('span.text-danger').remove();
          $("label[for='"+id+"']").after("<span class='text-danger'>*</span>");
      }
    });
    $('form').find('ngx-intl-tel-input').each(function(){
      if($(this).attr('required')){
          let id = $(this).attr('ng-reflect-input-id');
          $("label[for='"+id+"']").next('span.text-danger').remove();
          $("label[for='"+id+"']").after("<span class='text-danger'>*</span>");
      }
    });
  }

  ucWords(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
  optionsRealValue(word: string) {
    if (!word) return word;
    else word = word.replace('-',' ');
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
}
