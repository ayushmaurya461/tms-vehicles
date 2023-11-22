import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'input-tel',
  templateUrl: './input-tel.component.html',
  styleUrls: ['./input-tel.component.css']
})
export class InputTelComponent implements OnInit {

  constructor() { }

  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;

  public preferredCountries: CountryISO[] = [CountryISO.India];

  @Input() id:string = '';
  @Input() required:boolean = false;
  @Input() nextElement:any = {};
  @Input() data:any = {};
  @Output('error') error: any = new EventEmitter();

  ngOnInit(): void {
  }

  keyFunc(event:any,nextElementId:string,nextElementType:string='text',previousElementId:string='',previousElementType:string='text'){
    if(event.key=="Enter" || event.keyCode==13){
      if(nextElementId && nextElementId!="" && nextElementType && nextElementType!=""){
        if(nextElementType=='text' || nextElementType=='button'){
          $("#"+nextElementId).focus();
        }else if(nextElementType=='select'){
          $(event.target).blur();
          $("#"+nextElementId+" .ngx-select").focus();
        }
      }
    }else if((event.key=="Tab" || event.keyCode==9) && event.shiftKey){
      if(previousElementId && previousElementId!="" && previousElementType && previousElementType!=""){
        if(previousElementType=='text'){
          $("#"+previousElementId).focus();
        }else if(previousElementType=='select'){
          $(event.target).blur();
          $("#"+previousElementId+" .ngx-select").focus();
        }
      }
    }
  }

  sendErrors(errors:any){
    this.error.emit(errors);
  }

}
