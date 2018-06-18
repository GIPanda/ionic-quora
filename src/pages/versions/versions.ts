import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

/**
 * Generated class for the VersionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-versions',
  templateUrl: 'versions.html',
})
export class VersionsPage {

  appName: string;
  packageName: string;
  versionCode: string;
  versionNumber: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private appVersion: AppVersion) {
  }

  ionViewDidLoad() {
    this.appVersion.getAppName().then(val => {
      this.appName = val;
    });
    this.appVersion.getPackageName().then(val => {
      this.packageName = val;
    });
    this.appVersion.getVersionCode().then(val => {
      this.versionCode = val;
    });
    this.appVersion.getVersionNumber().then(val => {
      this.versionNumber = val;
    });
  }

}
