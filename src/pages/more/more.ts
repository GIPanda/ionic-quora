import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { User } from '../../app/domains/user.model';
import { UserPage } from '../user/user';
import { UserFeedsPage } from '../user-feeds/user-feeds';
import { SettingsProvider } from '../../providers/settings/settings';

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
  avatarSrc: string = '/assets/imgs/avatar-placeholder.png';
  userInfo: User = {};
  selectedTheme: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
    public settings: SettingsProvider,
    public storage: Storage) {
      super();
      this.settings.getActiveTheme().subscribe(theme => this.selectedTheme = theme);

  }

  showModal() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.onWillDismiss(data => {
      this.loadUserInfo();
    });    
    modal.present();
  }

  ionViewDidLoad() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.storage.get('UserId').then(val => {
      if (val !== null) {
        let loading = super.showLoading(this.loadCtrl);
        this.rest.getUserInfo(val).subscribe(res => {
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

  pushUserPage() {
    this.navCtrl.push(UserPage);
  }

  pushUserQsPage(type: string) {
    this.navCtrl.push(UserFeedsPage, {qsType: type});
  }

  toggleTheme() {
    if (this.selectedTheme === 'dark-theme' ){
      this.settings.setActiveTheme('light-theme');
    } else {
      this.settings.setActiveTheme('dark-theme');
    }
  }

}
