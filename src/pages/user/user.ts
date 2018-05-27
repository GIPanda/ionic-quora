import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI{

  avatarSrc: string = '/assets/imgs/avatar-placeholder.png';
  nickname: string = 'Loading ...';
  errorMsg: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public storage: Storage) {
    super();
  }

  ionViewDidEnter() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.storage.get('UserId').then(val => {
      if (val !== null) {
        let loading = super.showLoading(this.loadCtrl);
        this.rest.getUserInfo(val).subscribe(
          res => {
            this.nickname = res.UserNickName;
            this.avatarSrc = res.UserHeadface + '?' + (new Date()).valueOf();
            loading.dismiss();
          },
          error => this.errorMsg = <any> error
        );
      }
    });
  }

  updateNickname() {
    this.storage.get('UserId').then(val => {
      if (val !== null) {
        let loading = super.showLoading(this.loadCtrl);
        this.rest.udpateNickname(val, this.nickname).subscribe(
          res => {
            if (res.Status == "OK") {
              loading.dismiss();
              super.showToast(this.toastCtrl, "Nickname updated successfully")
            } else {
              loading.dismiss();
              super.showToast(this.toastCtrl, res.StatusContent);
            }
          }
        );
      }
    })
  }

  logout() {
    this.storage.remove('UserId');
    this.viewCtrl.dismiss();
  }

}
