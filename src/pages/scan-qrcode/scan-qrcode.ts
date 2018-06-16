import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

/**
 * Generated class for the ScanBarcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan-qrcode',
  templateUrl: 'scan-qrcode.html',
  providers: [QRScanner]
})
export class ScanQrcodePage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private qrScanner: QRScanner) {
  }

  ionViewDidEnter() {
    this.scanQRCode();
  }

  scanQRCode() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          let scanSub = this.qrScanner.scan().subscribe(((text:string) => {
            let alert = this.alertCtrl.create({
              title: 'QR Code',
              subTitle: text,
              buttons: ['OK']
            });
            alert.present();
            scanSub.unsubscribe();
          }));

          this.qrScanner.show();          
        } else if (status.denied) {

        } else {

        }
      })
      .catch(err => console.error('Error : ', err))
  }

}
