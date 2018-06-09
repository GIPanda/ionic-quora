import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatDetailPage } from '../chat-detail/chat-detail';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  avatarSrc: string = '/assets/imgs/avatar-placeholder.png';
  userInfo: Object;
  chatDetailPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userInfo = {
      userid: '123321',
      username: 'Chat bot'
    }
    this.chatDetailPage = ChatDetailPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
