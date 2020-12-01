import { Component, OnInit } from '@angular/core';
import { NotificationServiceProxy, UserServiceProxy, UserDto } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash';
import { MatDialogRef } from '@angular/material';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-publish-notification',
  templateUrl: './publish-notification.component.html',
  styleUrls: ['./publish-notification.component.css']
})
export class PublishNotificationComponent implements OnInit {
  message = '';
  saving = false;
  users: UserDto[] = [];
  selectedUserId:[]=[];
  tenantId;
  constructor(private _notificationServece: NotificationServiceProxy,
    private _userServece: UserServiceProxy,
    private _dialogRef: MatDialogRef<PublishNotificationComponent>) { }

  ngOnInit() {
    this._userServece.getOthers().subscribe(result => {
      this.users = result.items;
    });
    this.tenantId = abp.session.tenantId;
  }
  publish(): void {
    if (abp.session.tenantId != null) {
      this.saving = true;
      this._notificationServece.publishNotification( this.message, this.selectedUserId).pipe(
        finalize(() => {
          this.saving = false;
        })
      ).subscribe(() => {
        abp.notify.success('Notification Is Sucssefull Published', 'Publish Notification');
        this.close();
      });
      this.saving = false;
    }
  }
  close() {
    this._dialogRef.close();
  }
}
