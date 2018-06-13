import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserQuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-questions',
  templateUrl: 'user-questions.html',
})
export class UserQuestionsPage {
  qsType: string;
  title: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.qsType = navParams.get('qsType');
    switch (this.qsType) {
      case 'question':
        this.title = 'My questions';
        break;
      case 'favourite':
        this.title = 'My follows';
        break;
      case 'answer':
        this.title = 'My answers';
        break;
      default:
        break;
    }
  }


}
