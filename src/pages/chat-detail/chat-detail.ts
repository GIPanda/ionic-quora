import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatProvider, ChatMessage } from '../../providers/chat/chat';

/**
 * Generated class for the ChatDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html',
  providers: [ChatProvider]
})
export class ChatDetailPage {

  chatWith: string;
  showEmojis = false;
  chatMessages: ChatMessage[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public chatProvider: ChatProvider) {
    this.chatWith = navParams.get('username');
  }

  ionViewDidEnter() {
    this.getMessages();
  }

  toggleEmojiPicker() {
    this.showEmojis = !this.showEmojis;
  }

  getMessages() {
    return this.chatProvider.getMessages()
      .subscribe(res => {
        this.chatMessages = res;
        this.scrollToButtom();
      },
        error => console.error(error));
  }

  scrollToButtom(): any {
    // throw new Error("Method not implemented.");
  }

}
