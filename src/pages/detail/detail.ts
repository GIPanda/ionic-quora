import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { AnswerPage } from '../answer/answer';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage extends BaseUI {

  id: string;
  userId: string;
  question: any;
  answers: any = [];
  isFollowed: boolean;
  isOwner: boolean;
  errorMessage: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public rest: RestProvider,
    public storage: Storage,
    public navParams: NavParams) {
    super();
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.loadQuestion(this.id);
  }

  loadQuestion(questionId: string) {
    this.storage.get('UserId').then(userId => {
      if (userId !== null) {
        this.userId = userId;
        const loading = super.showLoading(this.loadingCtrl);
        this.rest.getQuestionWithUser(questionId, userId).subscribe(
          res => {
            this.question = res;
            this.answers = res.Answers;
            this.isFollowed = res.IsFavourate;
            this.isOwner = (res.OwnerUserId == userId);
            loading.dismiss();
          },
          error => this.errorMessage = <any>error
        );
      }
    })
  }

  toggleFollow() {
    const loading = super.showLoading(this.loadingCtrl);
    this.rest.toggleFollow(this.id, this.userId).subscribe(
      res => {
        if (res.Status === 'OK') {
          loading.dismiss();
          super.showToast(this.toastCtrl, this.isFollowed ? "You have unfollowed this question": "You have followed this question" );
          this.isFollowed = !this.isFollowed;
        }
      },
      error => this.errorMessage = <any>error
    );
  }

  showAnswerModal() {
    const modal = this.modalCtrl.create(AnswerPage, {id: this.id});
    modal.onWillDismiss(() => {
      this.loadQuestion(this.id);
    });
    modal.present();    
  }

}
