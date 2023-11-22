import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  constructor() {}
  public result = '';
  public ui = {
    confirm: async (message: string, buttons: any) =>
      this.createConfirm(message, buttons),
  };

  createConfirm = (message: string, buttons: any) => {
    return new Promise((complete) => {
      $('#confirm-modal #confirm-message').text(message);
      $('#confirm-modal #confirmInputFieldRequiredError').text('');
      $('#confirm-modal #confirmInputField').val('');
      $('#confirm-modal #confirmInputFieldLabel').removeClass('text-danger');
      $('#confirm-modal #confirmInputField').removeClass('border-danger');
      if (buttons) {
        if (buttons.positiveTitle) {
          $('#confirm-modal #confirmModalVerifyButton').text(
            buttons?.positiveTitle
          );
        }
        if (buttons.negativeTitle) {
          $('#confirm-modal #confirmModalCloseButton').text(
            buttons?.negativeTitle
          );
        }
        if (buttons.inputFieldLabel) {
          $('#confirmInputFieldLabel').text(buttons.inputFieldLabel);
          $('#confirmInputField').attr('placeholder', buttons.inputFieldLabel);
        }
        if (buttons.inputFieldRequired) {
          $('#confirmInputFieldRequired').text('*');
        }
      }

      $('#confirm-modal #confirmModalVerifyButton').off('click');
      $('#confirm-modal #confirmModalCloseButton').off('click');

      $('#confirm-modal #confirmModalVerifyButton').on('click', () => {
        this.result = '' + $('#confirmInputField').val();
        console.log(this.result);

        if (buttons && buttons.inputFieldRequired) {
          if (!this.result || this.result == '') {
            $('#confirm-modal #confirmInputFieldRequiredError').text(
              'Field is required'
            );
            $('#confirm-modal #confirmInputFieldLabel').addClass('text-danger');
            $('#confirm-modal #confirmInputField').addClass('border-danger');
          } else {
            $('#confirm-modal #confirmInputFieldRequiredError').text('');
            $('#confirm-modal #confirmInputFieldLabel').removeClass(
              'text-danger'
            );
            $('#confirm-modal #confirmInputField').removeClass('border-danger');
            (<any>$('#confirm-modal')).modal('hide');
            complete(this.result);
          }
        } else {
          if (!this.result || this.result == '') {
            (<any>$('#confirm-modal')).modal('hide');
            complete(1);
          } else {
            (<any>$('#confirm-modal')).modal('hide');
            complete(this.result);
          }
        }
      });
      $('#confirm-modal #confirmModalCloseButton').on('click', () => {
        (<any>$('#confirm-modal')).modal('hide');
        complete(false);
      });

      (<any>$('#confirm-modal')).modal();
      $('#confirm-modal').on('shown.bs.modal', function (e) {
        $('#confirm-modal #confirmInputField').focus();
      });
    });
  };

  async confirm(message: string, buttons: any = {}) {
    const confirmMessage = await this.ui.confirm(message, buttons);
    //   if (confirm) {
    //     return this.result;
    //   } else {
    //     return false;
    //   }
    if (confirmMessage) return confirmMessage;
    else return false;
  }
}
