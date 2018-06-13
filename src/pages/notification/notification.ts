import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage extends BaseUI {

  notifications: any;
  errorMessage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
    public storage: Storage) {
    super();
  }

  ionViewDidEnter() {
    this.storage.get('UserId').then((userId) => {
      if (userId != null) {
        var loading = super.showLoading(this.loadCtrl);
        this.rest.getUserNotfications(userId)
          .subscribe(
            res => {
              this.notifications = res;
              loading.dismissAll();
            },
            error => this.errorMessage = <any> error
          )
      }
    })
  }

  pushDetailPage(qsId) {
    this.navCtrl.push(DetailPage, {id: qsId});
  }

}
