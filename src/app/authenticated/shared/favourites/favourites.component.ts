import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favourites = [
    {
      name: 'Dashboard',
      url: '/dashboard',
    },
    {
      name: 'Companies list',
      url: '/company/companies-list',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
