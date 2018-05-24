import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  LoadingController,
  ToastController
} from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {

  mobile: any;
  password: any;
  errorMessage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public rest: RestProvider,
    public storage: Storage) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    const loading = super.showLoading(this.loadingCtrl, "Please wait ...");
    this.rest.login(this.mobile, this.password)
      .subscribe(res => {
        if (res.Status == "OK") {
          //@todo save token
          this.storage.set('UserId', res.UserId);
          loading.dismiss();
          this.dismiss();
        } else {
          loading.dismiss();
          super.showToast(this.toastCtrl, res.StatusContent);
        }
      },
        error => this.errorMessage = <any>error);
  }

  /**
   * Close current page  
   * 
   * @memberof LoginPage
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
