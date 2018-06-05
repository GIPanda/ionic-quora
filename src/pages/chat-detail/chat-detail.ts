import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
})
export class ChatDetailPage {

  chatWith: string; 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.chatWith = navParams.get('username');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatDetailPage');
  }

}
