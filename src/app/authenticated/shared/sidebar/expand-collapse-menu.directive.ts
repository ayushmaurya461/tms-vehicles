import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appExpandCollapseMenu]',
})
export class ExpandCollapseMenuDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onHover() {
    const isMiniSidebarEnabled = document.querySelector('.mini_sidebar');
    const menuTitle = this.elRef.nativeElement.querySelector('.menu_title');
    if (isMiniSidebarEnabled != null) {
      this.renderer.setStyle(menuTitle, 'font-weight', 'normal');
      this.renderer.setStyle(menuTitle, 'display', 'block');
    }
  }

  @HostListener('mouseleave') hideMenuOnLeave() {
    const isMiniSidebarEnabled = document.querySelector('.mini_sidebar');
    const subModule = this.elRef.nativeElement.querySelector('.submenu-list');
    const menuTitle = this.elRef.nativeElement.querySelector('.menu_title');
    if (isMiniSidebarEnabled != null)
      this.renderer.setStyle(menuTitle, 'display', 'none');
    if (subModule != null && isMiniSidebarEnabled != null) {
      this.renderer.removeClass(subModule, 'show');
      this.renderer.addClass(subModule, 'hide');
    }
  }

  // @HostListener('click') onclick() {
  //   const subModule = this.elRef.nativeElement.querySelector('.submenu-list');
  //   const allmenus = document.querySelectorAll('.submenu-list');
  //   const allmenuTitles = document.querySelectorAll('.menu_title');
  //   const menuTitle = this.elRef.nativeElement.querySelector('.menu_title');

  //   allmenus.forEach((menu) => {
  //     if (menu !== subModule) {
  //       this.renderer.removeClass(menu, 'show');
  //       this.renderer.addClass(menu, 'hide');
  //     }
  //   });
  //   allmenuTitles.forEach((title: any) => {
  //     this.renderer.setStyle(title, 'font-weight', 'normal');
  //   });
  //   if (subModule != null)
  //     if (subModule.classList.contains('hide')) {
  //       this.renderer.setStyle(menuTitle, 'font-weight', '700');
  //       this.renderer.removeClass(subModule, 'hide');
  //       this.renderer.addClass(subModule, 'show');
  //     } else {
  //       this.renderer.removeClass(subModule, 'show');
  //       this.renderer.addClass(subModule, 'hide');
  //       this.renderer.setStyle(menuTitle, 'font-weight', 'normal');
  //     }
  // }

  // ngOnInit(): void {}

  ngOnInit(): void {
    const menu = this.elRef.nativeElement.querySelector('.menu');
    menu.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick() {
    const subModule = this.elRef.nativeElement.querySelector('.submenu-list');
    const allmenus = document.querySelectorAll('.submenu-list');
    const allmenuTitles = document.querySelectorAll('.menu_title');
    const menuTitle = this.elRef.nativeElement.querySelector('.menu_title');

    allmenus.forEach((menu) => {
      if (menu !== subModule) {
        this.renderer.removeClass(menu, 'show');
        this.renderer.addClass(menu, 'hide');
      }
    });
    allmenuTitles.forEach((title: any) => {
      this.renderer.setStyle(title, 'font-weight', 'normal');
    });
    if (subModule != null)
      if (subModule.classList.contains('hide')) {
        this.renderer.setStyle(menuTitle, 'font-weight', '700');
        this.renderer.removeClass(subModule, 'hide');
        this.renderer.addClass(subModule, 'show');
      } else {
        this.renderer.removeClass(subModule, 'show');
        this.renderer.addClass(subModule, 'hide');
        this.renderer.setStyle(menuTitle, 'font-weight', 'normal');
      }
  }
}
