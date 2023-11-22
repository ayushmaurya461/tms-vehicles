import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() icon:string = '';
  @Input() options:any = [];
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedOptionChange(event:any){
  }

}
