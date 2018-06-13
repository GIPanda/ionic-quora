import { Component, Input } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { DetailPage } from '../../pages/detail/detail';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the QuestionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'questions',
  templateUrl: 'questions.html'
})
export class QuestionsComponent extends BaseUI {

  questions: any;
  errorMessage: any;

  @Input('qs-type') qsType;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
    public storage: Storage) {
    super();
  }

  ngOnInit() {
    this.storage.get('UserId').then((userId) => {
      if (userId != null) {
        var loading = super.showLoading(this.loadCtrl);
        this.rest.getQuestions(userId, this.qsType)
          .subscribe(
            res => {
              this.questions = res;
              loading.dismissAll();
            },
            error => this.errorMessage = <any>error
          )
      }
    })

  }


  pushDetailPage(qsId) {
    this.navCtrl.push(DetailPage, { id: qsId });
  }

}
