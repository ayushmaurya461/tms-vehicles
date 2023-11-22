import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/libraray/user.service';
import { HttpService } from 'src/app/services/http.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css'],
})
export class ShowDetailsComponent implements OnInit {
  @Input() data: any;
  @Input() buttons: any[] = [];
  @Input() columns: any[] = [];
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();

  detailsToBeShown: any[] = [];
  viewDetails: any = [];
  dataRow = [];
  public loading: boolean = false;
  viewLogs = false;

  constructor(
    private httpService: HttpService,
    private userService: UserService,
    private loader: LoadingService,
    private notification: NotificationService,
    private router: Router,
    public eventService: EventService
  ) {}

  ngOnInit(): void {
    this.showDetail();
    this.buttons.forEach((button) => {
      if (button.card == true) {
        var $btn = $('<button/>');
        $btn.html(button.text);
        $btn.attr('class', button.class);
        switch (button.title) {
          case 'View Map': {
            $btn.on('click', this.viewMap.bind(this));
            break;
          }
          default: {
            $btn.on('click', button.cardAction);
            break;
          }
        }
        $('.btns-controls').append($btn);
      }
    });
  }

  viewMap() {
    const details: any = this.data.data;
    if (this.data.title == 'city-table') {
      if (
        details.name &&
        details.subdistrict?.name &&
        details.district?.name &&
        details.state?.name
      ) {
        let html =
          '<iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;&q=' +
          details?.name +
          ',' +
          details.subdistrict?.name +
          ',' +
          details.data?.district?.name +
          ',' +
          details.data?.state?.name +
          '&amp;t=&amp;ie=UTF8&amp;iwloc=addr&amp;output=embed"></iframe>';
        $('#mapModalBody').html(html);
      } else if (
        details.name &&
        details.subdistrict?.name &&
        details.district?.name &&
        details.state?.name
      ) {
        let html =
          '<iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;&q=' +
          details.name +
          ',' +
          details.subdistrict?.name +
          ',' +
          details.district?.name +
          ',' +
          details.state?.name +
          '&amp;t=&amp;ie=UTF8&amp;iwloc=addr&amp;output=embed"></iframe>';
        $('#mapModalBody').html(html);
      } else {
        $('#mapModalBody').html(
          "<img src='assets/gif/404.gif' alt='No Data Found'/>"
        );
      }
      (<any>$('#viewMap')).modal('toggle');
    }

    if (this.data.title == 'country-table') {
      if (details.name) {
        let html =
          '<iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;&q=' +
          details.name +
          '&amp;t=&amp;ie=UTF8&amp;iwloc=addr&amp;output=embed"></iframe>';
        $('#mapModalBody').html(html);
      } else if (details.name) {
        let html =
          '<iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;&q=' +
          details.name +
          '&amp;t=&amp;ie=UTF8&amp;iwloc=addr&amp;output=embed"></iframe>';
        $('#mapModalBody').html(html);
      } else {
        $('#mapModalBody').html(
          "<img src='assets/gif/404.gif' alt='No Data Found'/>"
        );
      }
      (<any>$('#viewMap')).modal('toggle');
    }

    if (this.data.title == 'district-table') {
      if (details.name && details.state?.name && details.country?.name) {
        let html =
          '<iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;&q=' +
          details.data?.name +
          ',' +
          details.data?.state?.name +
          ',' +
          details.data?.country?.name +
          '&amp;t=&amp;ie=UTF8&amp;iwloc=addr&amp;output=embed"></iframe>';
        $('#mapModalBody').html(html);
      } else if (details.name && details.state?.name && details.country?.name) {
        let html =
          '<iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;&q=' +
          details.name +
          ',' +
          details.state?.name +
          ',' +
          details.country?.name +
          '&amp;t=&amp;ie=UTF8&amp;iwloc=addr&amp;output=embed"></iframe>';
        $('#mapModalBody').html(html);
      } else {
        $('#mapModalBody').html(
          "<img src='assets/gif/404.gif' alt='No Data Found'/>"
        );
      }
      (<any>$('#viewMap')).modal('toggle');
    }

    if (this.data.title == 'subdistrict-table') {
      if (
        details.name &&
        details.district?.name &&
        details.state?.name &&
        details.country?.name
      ) {
        let html =
          '<iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;&q=' +
          details.name +
          ',' +
          details.district?.name +
          ',' +
          details.state?.name +
          ',' +
          details.country?.name +
          '&amp;t=&amp;ie=UTF8&amp;iwloc=addr&amp;output=embed"></iframe>';
        $('#mapModalBody').html(html);
      } else if (
        details.name &&
        details.district?.name &&
        details.state?.name &&
        details.country?.name
      ) {
        let html =
          '<iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;&q=' +
          details.name +
          ',' +
          details.district?.name +
          ',' +
          details.state?.name +
          ',' +
          details.country?.name +
          '&amp;t=&amp;ie=UTF8&amp;iwloc=addr&amp;output=embed"></iframe>';
        $('#mapModalBody').html(html);
      } else {
        $('#mapModalBody').html(
          "<img src='assets/gif/404.gif' alt='No Data Found'/>"
        );
      }
      (<any>$('#viewMap')).modal('toggle');
    }

    if (this.data.title == 'state-table') {
      if (details.name) {
        let html =
          '<iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;&q=' +
          details.name +
          '&amp;t=&amp;ie=UTF8&amp;iwloc=addr&amp;output=embed"></iframe>';
        $('#mapModalBody').html(html);
      } else if (details.name) {
        let html =
          '<iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;&q=' +
          details.name +
          '&amp;t=&amp;ie=UTF8&amp;iwloc=addr&amp;output=embed"></iframe>';
        $('#mapModalBody').html(html);
      } else {
        $('#mapModalBody').html(
          "<img src='assets/gif/404.gif' alt='No Data Found'/>"
        );
      }
      (<any>$('#viewMap')).modal('toggle');
    }

    if (this.data.title == 'location-table') {
      if (details.latitude && details.longitude) {
        let html =
          '<iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;&q=' +
          details.latitude +
          ',' +
          details.longitude +
          '&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=addr&amp;output=embed"></iframe>';
        $('#mapModalBody').html(html);
      } else if (details.latitude && details.longitude) {
        let html =
          '<iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;&q=' +
          details.latitude +
          ',' +
          details.longitude +
          '&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=addr&amp;output=embed"></iframe>';
        $('#mapModalBody').html(html);
      } else {
        $('#mapModalBody').html(
          "<img src='assets/gif/404.gif' alt='No Data Found'/>"
        );
      }
      (<any>$('#viewMap')).modal('toggle');
    }
  }

  // showDetail() {
  //   $('.backdrop').show();
  //   (<any>$('#details')).modal('toggle');
  //   const details = this.data.data;
  //   this.columns.forEach((e: any) => {
  //     if (e.title.toLowerCase() == 'login') {
  //       var $btn = $('<button/>');
  //       $btn.on('click', () => {
  //         this.switchUser(details.id);
  //       });
  //       $btn.html('<i class="fi fi-rs-sign-in-alt"></i>');
  //       $btn.attr('class', 'btn card-btns btn-success');
  //       $('.btns-controls').append($btn);
  //     } else if (e.title.toLowerCase() == 'type') {
  //       let cType: any = [];
  //       if (typeof details.type == 'string') {
  //         this.detailsToBeShown.push({
  //           title: e.title,
  //           value: details.type,
  //         });
  //       } else {
  //         details.types.forEach((type: any) => {
  //           cType.push(type.company_type.name);
  //         });
  //       }
  //       this.detailsToBeShown.push({
  //         title: e.title,
  //         value: cType.join(', '),
  //       });
  //     } else {
  //       const arr = e.data.split('.');
  //       var val = '';
  //       try {
  //         for (var i = 0; i < arr.length; i++) {
  //           val = val == '' ? details[arr[i]] : val[arr[i]];
  //         }
  //       } catch (error) {
  //         val = 'Not Available';
  //       }
  //       if (!val) val = 'Not Available';
  //       this.detailsToBeShown.push({
  //         title: e.title,
  //         value: val,
  //       });
  //     }
  //   });
  // }

  showDetail() {
    $('.backdrop').show();
    (<any>$('#details')).modal('toggle');
    const details = this.data.data;
    console.log(details);
    this.columns.forEach((e: any) => {
      if (e.title.toLowerCase() == 'login') {
        const $btn = $('<button/>')
          .on('click', () => this.switchUser(details.id))
          .html('<i class="fi fi-rs-sign-in-alt"></i>')
          .attr('class', 'btn card-btns btn-success');

        $('.btns-controls').append($btn);
      } else if (e.title.toLowerCase() == 'type') {
        const cType =
          typeof details.type == 'string'
            ? [details.type]
            : details.types.map((type: any) => type.company_type.name);

        this.detailsToBeShown.push({
          title: e.title,
          value: cType.join(', '),
        });
      } else {
        let val = '';
        try {
          val = e.data
            .split('.')
            .reduce((obj: any, key: string) => obj[key], details);
        } catch (error) {
          val = 'Not Available';
        }
        if (!val) val = 'Not Available';
        this.detailsToBeShown.push({
          title: e.title,
          value: val,
        });
      }
    });
  }

  switchUser(userId: any) {
    $('.modal-dialog').hide();
    this.loader.show();
    var type = 'company';
    if (this.userService.companyCode && this.userService.companyCode != '') {
      type = 'subcompany';
    }
    this.httpService
      .postRequestWithHeaders('switch-user', { type: type, id: userId })
      .subscribe(
        (response: any) => {
          if (response && response.status) {
            this.loading = false;
            this.loader.hide();
            this.userService.clean();
            this.userService.id = response.response.data.id;
            this.userService.userType = response.response.data.user_type;
            this.userService.userName = response.response.data.user_name;
            this.userService.fullName = response.response.data.user_name;
            this.userService.token = response.response.data.token;
            this.userService.companyId = response.response.data.company_id;
            this.userService.companyCode = response.response.data.company_code;
            this.userService.subCompanyCode =
              response.response.data.subcompany_code;
            this.userService.accessList = response.response.data.access_list;
            this.userService.branchList = response.response.data.branch_list;
            this.userService.userBranch = response.response.data.user_branch;
            this.userService.fromYear = response.response.data.from_year;
            this.userService.fiscalYear = response.response.data.fiscal_year;
            this.userService.save();
            this.notification.apiSuccess(response);
            this.router.navigate(['dashboard']);
            this.loader.hide();
          } else {
            this.loader.hide();
            this.notification.error(
              'Something went wrong, please try after sometime'
            );
          }
        },
        (error: any) => {
          this.loading = false;
          this.loader.hide();
          this.notification.apiError(error);
        }
      );
  }

  closedDetails() {
    this.closeEvent.emit(true);
  }
}
