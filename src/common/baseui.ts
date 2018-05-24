import { Loading, LoadingController, ToastController, Toast } from 'ionic-angular';
/**
 * Class of shared ui components
 * 
 * @export
 * @abstract
 * @class BaseUI
 */
export abstract class BaseUI {
  constructor() { }

  /**
   * Common loading present component
   * 
   * @protected
   * @param {LoadingController} loadingCtrl 
   * @param {string} message 
   * @returns {Loading} 
   * @memberof BaseUI
   */
  protected showLoading(loadingCtrl: LoadingController, message: string = 'Please wait'): Loading {
    let loader = loadingCtrl.create({
      content: message,
      duration: 3000,
      dismissOnPageChange: true
    });
    loader.present();
    return loader;
  }
  
  /**
   * Common toast present component
   * 
   * @protected
   * @param {ToastController} toastCtrl 
   * @param {string} message 
   * @returns {Toast} 
   * @memberof BaseUI
   */
  protected showToast(toastCtrl: ToastController, message: string): Toast {
    let toast = toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    return toast
  }
}