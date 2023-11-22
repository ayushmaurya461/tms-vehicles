import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-cards',
  templateUrl: './nav-cards.component.html',
  styleUrls: ['./nav-cards.component.css'],
})
export class NavCardsComponent implements OnInit {
  @Input() navs: any;
  @Input() detailsButton: boolean = false;
  @Input() updateButton: boolean = false;
  @Input() buttons: boolean = false;
  backgroundImage = 'assets/img/icon/permission.webp';

  constructor(private router: Router) {}

  ngOnInit(): void {}
  updateDetails(_t4: any) {
    throw new Error('Method not implemented.');
  }
  showDetails(_t4: any) {
    throw new Error('Method not implemented.');
  }
}
