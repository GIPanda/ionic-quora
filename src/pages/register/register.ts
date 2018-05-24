import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI{

  mobile: string;
  nickname: string;
  password: string;
  confirmPwd: string;
  errorMessage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public rest: RestProvider
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  /**
   * Close current page  
   * 
   * @memberof LoginPage
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  backToLogin() {
    this.navCtrl.pop();
  }

  register() {
    if (!(/^1[34578]\d{9}$/.test(this.mobile))) {
      super.showToast(this.toastCtrl, 'Invalid phone number');
    } else if (this.nickname.length < 3 || this.nickname.length>15) {
      super.showToast(this.toastCtrl, 'Nickname length must be between 3 and 15 characters');
    } else if (this.password.length < 6 || this.password.length > 20){
      super.showToast(this.toastCtrl, 'Password length must be between 6 and 20 characters');
    } else if (this.password !== this.confirmPwd) {
      super.showToast(this.toastCtrl, 'Passwords not match');
    } else {
      const loading = super.showLoading(this.loadingCtrl, 'Registering ...');
      this.rest.register(this.mobile, this.nickname, this.password)
        .subscribe(res => {
          if (res.Status == "OK") {
            super.showToast(this.toastCtrl, 'Registration successful');            
            loading.dismiss();
            this.dismiss();
          } else {
            loading.dismiss();
            super.showToast(this.toastCtrl, res.StatusContent);
          }
        },
        error => this.errorMessage = <any> error
      );
    }

  }
}
