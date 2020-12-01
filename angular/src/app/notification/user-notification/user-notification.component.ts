import { Component, OnInit } from '@angular/core';
import {  NotificationServiceProxy, UserNotification, IUserNotification } from '@shared/service-proxies/service-proxies';
import { MessageData } from './MessageData';

@Component({
  selector: 'user-notification',
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.css']
})
export class UserNotificationComponent implements OnInit {
  notificationCount;
  notifications: any[] = [];
  userNotifications: MessageData[] = [];

  constructor(private _notificationServece: NotificationServiceProxy) { }

  ngOnInit() {
    this.refresh();

  abp.event.on('abp.notifications.received',  userNotification => {
    if (userNotification.notification.data.type === 'Abp.Notifications.MessageNotificationData') {
       // abp.notifications.showUiNotifyForUserNotification(userNotification.notification.data.message);
     //   abp.notifications.showUiNotifyForUserNotification(userNotification);
      // abp.notifications.getFormattedMessageFromUserNotification(userNotification) ;
      this.refresh();
    }
  });
  }
update(userNotificationId , index): void {
    if (abp.session.tenantId != null) {
this._notificationServece.updateUserNotificationState(userNotificationId , abp.session.tenantId).subscribe();
this.refresh();
    }
}

refresh() {
    if (abp.session.tenantId != null) {
      this._notificationServece.getUserNotifications(abp.session.userId, abp.session.tenantId).subscribe(result => {
        this.notifications = result;
        this.userNotifications = [];
        this.notifications.forEach(r => {
          var message = abp.notifications.getFormattedMessageFromUserNotification(r);
        var messageData = new MessageData();
        messageData.message = message;
        messageData.id = r.id;
        this.userNotifications.push(messageData);
        });
    });
    }

}
}
