import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/libraray/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mobile-footer',
  templateUrl: './mobile-footer.component.html',
  styleUrls: ['./mobile-footer.component.css'],
})
export class MobileFooterComponent implements OnInit, AfterViewInit {
  fa_sm = 'fa-solid fa-messages';
  constructor(
    public userService: UserService,
    private authService: AuthService
  ) {}

  showbackdrop = false;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    $('div.profile_info_iner_mobile').hide();
    $('app-notifications').hide();
    $('app-chat-window').hide();
    $('app-favourites').hide();

    $('div.profile_info_mobile').on('click', function () {
      $('div.profile_info_iner_mobile').toggle();
      $('app-chat-window').hide();
      $('app-notifications').hide();
      $('app-favourites').hide();
    });

    $('div.notification_mobile').on('click', function () {
      $('app-notifications').toggle();
      $('div.profile_info_iner_mobile').hide();
      $('app-chat-window').hide();
      $('app-favourites').hide();
    });

    $('div.chat_box_mobile').on('click', function () {
      $('app-chat-window').toggle();
      $('div.profile_info_iner_mobile').hide();
      $('app-notifications').hide();
      $('app-favourites').hide();
    });

    $('div.favourites_mobile').on('click', function () {
      $('app-favourites').toggle();
      $('app-notifications').hide();
      $('app-chat-window').hide();
      $('div.profile_info_iner_mobile').hide();
    });
  }

  logout() {
    this.authService.logout();
  }
}
