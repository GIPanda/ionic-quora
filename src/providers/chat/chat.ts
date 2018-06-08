import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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

  constructor(public http: HttpClient) {
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



}
