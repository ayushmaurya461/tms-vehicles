import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavigationEnd, Router } from '@angular/router';
import { CheckScreenSize } from '../services/check-screen-size.service';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.css'],
})
export class AuthenticatedComponent implements OnInit {
  @HostListener('window: resize', ['$event']) onResize(_event: any) {
    this.checkScreenSize();
  }
  @ViewChild('sidebar')
  sidebar!: SidebarComponent;

  public loading: boolean = false;

  constructor(
    private router: Router,
    public checkScreenSizeService: CheckScreenSize
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
  }
  ngAfterViewInit() {}

  onOutletLoaded(component: any) {
    component.loading = false;
  }

  checkScreenSize() {
    const width = window.innerWidth;
    if (width >= 768) {
      this.checkScreenSizeService.updateMobileValue(false);
    } else {
      this.checkScreenSizeService.updateMobileValue(true);
    }
  }
}
