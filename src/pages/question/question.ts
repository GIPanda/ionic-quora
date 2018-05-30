import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage extends BaseUI{

  qsTitle: string;
  qsContent: string;
  errorMessage: any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public storage: Storage,
    public rest: RestProvider) {
      super();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submitQuestion() {
    this.storage.get('UserId').then(val => {
      if (val !== null) {
        const loading = super.showLoading(this.loadingCtrl);
        this.rest.saveQuestion(val, this.qsTitle, this.qsContent)
          .subscribe(res => {
            if (res.Status == 'OK') {
              loading.dismissAll();
              this.dismiss();
            } else {
              super.showToast(this.toastCtrl, res.StatusContent);
            }
          }, 
          error => this.errorMessage = <any> error);
        
      } else {
        super.showToast(this.toastCtrl, 'Please sgin in before asking a question.')
      }
    });
  }

}
