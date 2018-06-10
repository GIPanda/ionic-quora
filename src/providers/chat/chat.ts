import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import { Events } from 'ionic-angular';

export class ChatMessage {
  messageId: string;
  userId: string;
  username: string;
  userImgUrl: string;
  toUserId: string;
  time: number | string;
  message: string;
  status: string;
}

export class UserInfo {
  userId: string;
  userName: string;
  userImgUrl: string;
}

@Injectable()
export class ChatProvider {

  constructor(public http: HttpClient, public events: Events) {
  }

  getMessages(): Observable<ChatMessage[]> {
    const url = `../../assets/mock/msg-list.json`;
    return this.http.get(url)
      .map((res: any) => {
        if (res.chatMessages instanceof Array) {
          return res.chatMessages as ChatMessage[];
        } else {
          return [];
        }
      });
  }

  sendMessage(message: ChatMessage): Observable<any> {
    return Observable.of(null)
      .delay(Math.random() * 1000)
      .do(() => {
        this.mockNewMessage(message);
      });
  }

  mockNewMessage(message: any) {
    const msgId = Date.now().toString();
    const msgRecieved = {
      messageId: msgId,
      userId: '123321',
      username: '慕女神',
      userImgUrl: 'http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg',
      toUserId: message.userId,
      time: Date.now(),
      message: `You just sent me a message with content '${message.message}'`,
      status: 'success'
    };

    setTimeout(
      () => {
        this.events.publish('chat.recieved', msgRecieved, Date.now())
      },
      Math.random() * 1000
    )
  }



}
