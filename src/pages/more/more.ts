import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { User } from '../../app/domains/user.model';

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI{

  isLoggedIn: boolean = false;
  avatarSrc: string;
  userInfo: User = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
    public storage: Storage) {
      super();
  }

  showModal() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.onWillDismiss(data => {
      this.loadUserPage();
    });    
    modal.present();
  }

  ionViewDidEnter() {
    this.loadUserPage();
  }

  loadUserPage() {
    this.storage.get('UserId').then(val => {
      if (val !== null) {
        let loading = super.showLoading(this.loadCtrl);
        this.rest.getUserInfo(val).subscribe(res => {
          console.log(res);
          this.userInfo = {
            id: res.UserId,
            nickname: res.UserNickName,
            avatar: res.UserHeadface
          }
          this.avatarSrc = res.UserHeadface + '?' + (new Date()).valueOf();
          loading.dismiss();
        });
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

}
