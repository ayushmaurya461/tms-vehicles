import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements OnInit, AfterViewInit {
  @HostListener('window: resize', ['$event']) onResize(_event: any) {
    this.checkScreenSize();
  }
  @Output() closeChatbox: EventEmitter<boolean> = new EventEmitter<boolean>();

  public mobile = false;
  mediaScreenSize = 768;
  constructor() {}

  ngOnInit(): void {
    this.checkScreenSize();
  }
  ngAfterViewInit(): void {
    if (!this.mobile) {
      $('div.chat_box_mobile').addClass('expand_message_window');
      $('.message_chatbox_minimize').on('click', function () {
        $('div.chat_box_mobile').toggleClass('collapse_message_window');
        $('div.chat_box_mobile').toggleClass('expand_message_window');
        $('.message_chatbox_minimize svg').toggleClass('rotate');
        // $('div.message_window').toggle();
        $('div.chat_listed_member_mobile').toggle();
        $('div.chat_popup_bottom').toggle();
      });
      $('message_chatbox_close_mobile').on('click', function () {});
    }
  }

  checkScreenSize() {
    const width = window.innerWidth;
    if (width >= this.mediaScreenSize) {
      this.mobile = false;
    } else {
      this.mobile = true;
    }
  }

  closeChatboxEvent() {
    this.closeChatbox.emit(true);
  }
}
