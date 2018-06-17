import { Component } from '@angular/core';
import { 
  IonicPage,
  normalizeURL,
  NavController,
  NavParams, 
  ActionSheetController, 
  LoadingController, 
  Platform, 
  ToastController, 
  ViewController 
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';

import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any; // import third part js lib

/**
 * Generated class for the AvatarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avatar',
  templateUrl: 'avatar.html',
  providers: [
    FileTransfer, File, FilePath
  ]
})
export class AvatarPage extends BaseUI {

  userId: string;
  errorMessage: string;
  lastImage: string = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public rest: RestProvider,
    public storage: Storage,
    public camera: Camera,
    public transfer: FileTransfer,
    public file: File,
    public filePath: FilePath,
    public platform: Platform
  ) {
    super();
  }

  ionViewDidEnter() {
    this.storage.get('UserId').then((val) => {
      if (val !== null) {
        this.userId = val;
      }
    })
  }

  showActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select image',
      buttons: [
        {
          text: 'Select form album',
          handler: () => {
            this.takePhoto(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Take photo',
          handler: () => {
            this.takePhoto(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  takePhoto(sourceType) {
    let options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imagePath) => {
      //special fix for android file path problem
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(path => {         
            let correctPath = path.substr(0, path.lastIndexOf('/') + 1);
            let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyToLocalDir(correctPath, currentName, this.generateFileName());
          })
      } else {
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        this.copyToLocalDir(correctPath, currentName, this.generateFileName());
      }
    }, error => {
      super.showToast(this.toastCtrl, "Take photo error, please check app permissions");
    });
  }

  copyToLocalDir(filePath, currentName, newName) {
    this.file.copyFile(filePath, currentName, cordova.file.dataDirectory, newName)
      .then(success => {
        this.lastImage = newName;
      }, err => {
        super.showToast(this.toastCtrl, "Local photo save error");
      });
  }

  generateFileName() {
    let d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";

    return newFileName;
  }

  getImgPath(img) {
    if (img === null)  {
      return '';
    } else {
      return normalizeURL(cordova.file.dataDirectory + img); 
    }
  }

  uploadImage() {
    const targetPath = this.getImgPath(this.lastImage);
    const filename = this.userId + '.jpg';
    const options: FileUploadOptions = {
      fileKey: 'file',
      fileName: filename,
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {
        filename: filename,
        userid: this.userId
      }
    }

    const fileTransfer: FileTransferObject = this.transfer.create();

    const loading = super.showLoading(this.loadingCtrl, "Uploading ...");

    fileTransfer.upload(targetPath, this.rest.apiUrlUploadImage, options)
      .then(data => {
        loading.dismiss();
        super.showToast(this.toastCtrl, "Avatar is uploaded successfully");
        setTimeout(() => {
          this.viewCtrl.dismiss();
        }, 3000);
      }, err => {
        loading.dismiss();
        super.showToast(this.toastCtrl, "Avatar upload error");
      });

  }

}
