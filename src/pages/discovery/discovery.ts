import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the DiscoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage extends BaseUI{

  feeds: any = [];
  errorMessage: any;
  
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider
  ) {
    super();
  }

  ionViewDidEnter() {
    this.getFeeds();
  }

  getFeeds() {
    const loading = super.showLoading(this.loadingCtrl);
    this.rest.getDiscoveryFeeds().subscribe(res => {
      this.feeds = res;
      loading.dismiss();
    },
    error => this.errorMessage = <any>error);
  }  

  doRefresh(refresher) {
    this.getFeeds();
    refresher.complete();
  }

  pushDetailPage(questionId) {
    this.navCtrl.push(DetailPage, {id: questionId});
  }
}
