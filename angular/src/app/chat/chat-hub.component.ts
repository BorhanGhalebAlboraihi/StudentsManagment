import { Component, OnInit } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { style } from '@angular/animations';
import { ChatClass } from './chatClass';
import { ChatRomeDto, ChatRomeServiceProxy, NotificationServiceProxy, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import 'jquery';
import { AppSessionService } from '@shared/session/app-session.service';
import { finalize } from 'rxjs/operators';
import { MessageData } from '@app/notification/user-notification/MessageData';

@Component({
  selector: 'app-chat-hub',
  templateUrl: './chat-hub.component.html',
  styleUrls: ['./chat-hub.component.css']
})
export class ChatHubComponent implements OnInit {
  listLi : ChatClass[] = [];
  message = '';
  onlineClients: any[] = [];
  users: UserDto[] = [];
  chatTo: number;
  txt: string;
  chatHub2;
  chatFrom: number;
  chatRomes: ChatRomeDto[] = [];
  chat: ChatRomeDto ;
  notificationCount;
  notifications: any[] = [];
  selectedUserId:any[]=[];
  userNotifications: MessageData[] = [];
  constructor(private _userServece: UserServiceProxy,
    private _chatServece: ChatRomeServiceProxy,
    public _loServece: AppSessionService,
    private _notificationServece: NotificationServiceProxy) { }

  ngOnInit() {
    this.chatFrom = abp.session.userId;
    this.chatTo = 0;
    this.chat = new ChatRomeDto();
    this._userServece.getOthers().subscribe(result => {
      this.users = result.items;
    });
    $(".messages").animate({ scrollTop: $(document).height() }, "fast");

    $("#profile-img").click(function() {
      $("#status-options").toggleClass("active");
    });

    $(".expand-button").click(function() {
      $("#profile").toggleClass("expanded");
      $("#contacts").toggleClass("expanded");
    });

    $("#status-options ul li").click(function() {
      $("#profile-img").removeClass();
      $("#status-online").removeClass("active");
      $("#status-away").removeClass("active");
      $("#status-busy").removeClass("active");
      $("#status-offline").removeClass("active");
      $(this).addClass("active");

      if($("#status-online").hasClass("active")) {
        $("#profile-img").addClass("online");
      } else if ($("#status-away").hasClass("active")) {
        $("#profile-img").addClass("away");
      } else if ($("#status-busy").hasClass("active")) {
        $("#profile-img").addClass("busy");
      } else if ($("#status-offline").hasClass("active")) {
        $("#profile-img").addClass("offline");
      } else {
        $("#profile-img").removeClass();
      };

      $("#status-options").removeClass("active");
    });

    abp.event.on('abp.notifications.received',  userNotification => {
      if (userNotification.notification.data.type === 'Abp.Notifications.MessageNotificationData') {
         // abp.notifications.showUiNotifyForUserNotification(userNotification.notification.data.message);
       //   abp.notifications.showUiNotifyForUserNotification(userNotification);
        // abp.notifications.getFormattedMessageFromUserNotification(userNotification) ;
     //   this.refresh();
    // this.getChat();
    this.addMsg(this.message);
      }
    });



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
send(){
this.selectedUserId = [];
this.selectedUserId.push(this.chatTo);
this.	message = $("#txtMessage").val().toString();
      this._notificationServece.publishNotification( this.message, this.selectedUserId).subscribe(() => {
      //  abp.notify.success('Notification Is Sucssefull Published', 'Publish Notification');


    if( this.message === '') {
      return false;
    }
    this.saveChat(this.message);
   // this.getChat();
   this.addMsg(this.message);
    $('.message-input input').val(null);
    $('.contact.active .preview').html('<span>You: </span>' + this.message);
    $(".messages").animate({ scrollTop: $(document).height() }, "fast");
      });
}
addMsg(msg) {
  var chatR = new ChatRomeDto();
  var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
  chatR.from = this.chatFrom;
  chatR.to = this.chatTo;
  chatR.message = msg;
  chatR.date = dateTime;
  this.chatRomes.push(chatR);
}

setInfo(to) {
  this.chatTo = to;
  this.getChat() ;
}
getChat() {
  this._chatServece.getAllChats(this.chatFrom , this.chatTo  , '' , '' , 0 ).subscribe(r => {this.chatRomes = r ;});
  }

saveChat(msg: string) {
  var chatR = new ChatRomeDto();
  var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
  chatR.from = this.chatFrom;
  chatR.to = this.chatTo;
  chatR.message = msg;
  chatR.date = dateTime;
  this._chatServece.create(chatR).subscribe(r => {});
  }

}
