import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'page-title',
  templateUrl: './page-title-bar.component.html',
  styleUrls: ['./page-title-bar.component.css']
})
export class PageTitleBarComponent implements OnInit {

  @Input() title:string = "";
  @Input() path:any = [];
  @Input() right_nav:boolean = false;

  constructor() { }

  ngOnInit(): void {
    $('.sidebar_icon_right svg').on('click', function(){
      console.log('yes');
      $('.sidebar-right').addClass('active_sidebar_right');
    });
  }

  openSideRight():any{
    $('.sidebar-right').addClass('active_sidebar_right');
  }

}
