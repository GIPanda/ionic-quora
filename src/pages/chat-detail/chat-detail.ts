import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput, Content } from 'ionic-angular';
import { ChatProvider, ChatMessage, UserInfo } from '../../providers/chat/chat';
import { Storage } from '@ionic/storage';
import { User } from '../../domain';
import { RestProvider } from '../../providers/rest/rest';

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

  chatWith: User;
  curUser: User;
  showEmojis = false;
  chatMessages: ChatMessage[] = [];
  errorMessage: any;
  editorMsg: string;

  @ViewChild(Content) content: Content;
  @ViewChild('chatInput') messageInput: TextInput;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public chatProvider: ChatProvider,
    public rest: RestProvider,
    public storage: Storage) {
    this.chatWith = {
      id: navParams.get('userid'),
      username: navParams.get('username')
    }
    this.loadUser();
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

  loadUser() {
    this.storage.get('UserId').then(userId => {
      if (userId != null) {
        this.rest.getUserInfo(userId)
          .subscribe(
            res => {
              this.curUser = {
                id: '140000198202211138',
                username: res.UserNickName,
                avatar: res.UserHeadface + '?' + (new Date()).valueOf()
              }
            },
            error => this.errorMessage = error
          )
      }
    })
  }

  scrollToButtom(): any {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    })
  }

  onChatInputFocus() {
    this.showEmojis = false;
    this.content.resize();
    this.scrollToButtom();
  }

  sendMessage() {

  }
}
