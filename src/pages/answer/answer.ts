import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage extends BaseUI{

  id: string;
  content: string;
  errorMessage: string;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public rest: RestProvider,
    public storage: Storage) {
      super();
      this.id = this.navParams.get('id');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  publish() {
    this.storage.get('UserId').then(userId => {
      if (userId !== null) {
        const loading = super.showLoading(this.loadingCtrl);
        this.rest.answer(this.id, userId, this.content).subscribe(
          res => {
            if (res.Status === 'OK') {
              loading.dismissAll();
              this.dismiss()
            } else {
              loading.dismissAll();
              super.showToast(this.toastCtrl, res.StatusContent);
            }
          },
          error => this.errorMessage = <any> error
        );
      }
    })
  }

}
