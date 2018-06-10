import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput, Content, Events } from 'ionic-angular';
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
    public events: Events,
    public storage: Storage) {
    this.chatWith = {
      id: navParams.get('userid'),
      username: navParams.get('username')
    }
    this.loadUser();
  }

  ionViewDidEnter() {
    this.getMessages();

    this.events.subscribe('chat.recieved', (message: ChatMessage, time) => {
      this.chatMessages.push(message);
      this.scrollToButtom();
    })
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
    if (this.editorMsg.trim()) {
      const msgId = Date.now().toString();
      const msgToSend = {
        messageId: msgId,
        userId: this.curUser.id,
        username: this.curUser.username,
        userImgUrl: this.curUser.avatar,
        toUserId: this.chatWith.id,
        time: Date.now(),
        message: this.editorMsg,
        status: 'pending'
      };
      this.chatMessages.push(msgToSend);
      this.scrollToButtom();

      this.editorMsg = '';
      if (this.showEmojis) {
        this.messageInput.setFocus();
      }

      this.chatProvider.sendMessage(msgToSend).subscribe(() => {
        const index = this.chatMessages.findIndex(e => e.messageId === msgId);
        if (index !== -1) {
          this.chatMessages[index].status = 'success';
        }
      });
    }
  }

  ionViewWillLeave() {
    this.events.unsubscribe('chat.recieved');
  }

}
