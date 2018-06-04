import { Component } from '@angular/core';
import { NavController, ModalController, Tabs, LoadingController } from 'ionic-angular';
import { QuestionPage } from '../question/question';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI{

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

  ionViewDidLoad() {
    this.getFeeds();
  }

  showQuestionModal() {
    const modal = this.modalCtrl.create(QuestionPage);
    modal.present();
  }

  pushChatPage() {
    this.selectTab(2);
  }

  /**
   * Select tab by given index
   * 
   * @param {number} index 
   * @memberof HomePage
   */
  selectTab(index: number) {
    const tab: Tabs = this.navCtrl.parent;
    tab.select(index);
  }

  getFeeds() {
    const loading = super.showLoading(this.loadingCtrl);
    this.rest.getHomeFeeds().subscribe(res => {
      this.feeds = res;
      loading.dismiss();
    },
    error => this.errorMessage = <any>error);
  }

  pushDetailPage(questionId) {
    this.navCtrl.push(DetailPage, {id: questionId});
  }
}
