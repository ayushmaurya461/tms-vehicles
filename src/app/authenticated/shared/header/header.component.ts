import { Component, HostListener, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from 'src/app/libraray/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @HostListener('window: resize', ['$event']) onResize(_event: any) {
    this.checkScreenSize();
  }
  public mobile = false;
  private mediaScreenSize: number = 768;
  public chatbox = false;
  public notifications = false;
  public finYearOptions: any = [];

  constructor(
    private authService: AuthService,
    public userService: UserService,
    public sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
    var currentYear =
      new Date().getMonth() + 1 < 4
        ? new Date().getFullYear() - 1
        : new Date().getFullYear();
    for (
      var year: any = currentYear;
      year >= this.userService.fromYear;
      year--
    ) {
      var finYear = year + '-' + (parseFloat(year) + 1);
      this.finYearOptions.push({ id: finYear, name: finYear });
    }

    $('.open_miniSide').on('click', function () {
      $('.sidebar').toggleClass('mini_sidebar');
      if ($('.sidebar').hasClass('mini_sidebar')) {
        $('.menu_title').css('display', 'none');
      } else {
        $('.menu_title').css('display', 'block');
      }
      $('.menu_title').css('font-weight', 'normal');
      $('.main_content ').toggleClass('full_main_content');
      $('.footer_part ').toggleClass('full_footer');
    });
    $('.sidebar_icon').on('click', function () {
      $('.submenu-list').addClass('hide');
      $('.submenu-list').removeClass('show');
      $('.sidebar').toggleClass('active_sidebar');
      $('.sidebar').removeClass('mini_sidebar');
      $('.menu_title').css('display', 'block');
    });
    $('.sidebar_close_icon i').on('click', function () {
      $('.sidebar').removeClass('active_sidebar');
    });

    //active menu
    $('.troggle_icon').on('click', function () {
      $('.setting_navbar_bar').toggleClass('active_menu');
    });

    $('.bell_notification_clicker').on('click', function () {
      $('.Menu_NOtification_Wrap').toggleClass('active');
    });

    $(document).on('click', function (event) {
      if (
        !$(event.target).closest(
          '.bell_notification_clicker ,.Menu_NOtification_Wrap'
        ).length
      ) {
        $('body').find('.Menu_NOtification_Wrap').removeClass('active');
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  setUserBranchId(data: any) {
    this.userService.userBranch = data.target.value;
    this.userService.save();
  }
  setFiscalYear(data: any) {
    this.userService.fiscalYear = data.target.value;
    this.userService.save();
  }

  closeChatbox() {
    this.chatbox = false;
  }

  showChatbox() {
    this.chatbox = !this.chatbox;
    this.notifications = false;
  }

  showNotifications() {
    this.notifications = !this.notifications;
  }

  checkScreenSize() {
    const width = window.innerWidth;
    this.mobile = width >= this.mediaScreenSize ? false : true;
  }
}
