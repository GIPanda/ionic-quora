import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  //feed
  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';

  //account
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';
  private apiGetUserQuestionList = "https://imoocqa.gugujiankong.com/api/account/getuserquestionlist";

  //question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
  private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
  private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";

  //notification
  private apiUrlUserNotifications = "https://imoocqa.gugujiankong.com/api/account/usernotifications";

  constructor(public http: HttpClient) {
  }

  /**
   * Login by mobile phone and password
   * 
   * @param {any} mobile 
   * @param {any} password 
   * @returns {Observable<any>} 
   * @memberof RestProvider
   */
  login(mobile, password): Observable<any> {
    return this.get(`${this.apiUrlLogin}?mobile=${mobile}&password=${password}`);
  }
  /**
   * Register user
   * 
   * @param {any} mobile 
   * @param {any} nickname 
   * @param {any} password 
   * @returns {Observable<any>} 
   * @memberof RestProvider
   */
  register(mobile, nickname, password): Observable<any> {
    return this.get(`${this.apiUrlRegister}?mobile=${mobile}&nickname=${nickname}&password=${password}`);
  }

  getUserInfo(userId: string): Observable<any> {
    return this.get(`${this.apiUrlUserInfo}?userid=${userId}`);
  }

  udpateNickname(userId, nickname): Observable<any> {
    return this.get(`${this.apiUrlUpdateNickName}?userid=${userId}&nickname=${nickname}`);
  }

  /**
   * Global HTTP request method
   * @Dongjie LIU
   * @private
   * @param {string} url 
   * @returns {Observable<any>} 
   * @memberof RestProvider
   */
  private get(url: string): Observable<any> {
    return this.http.get(url)
      .map(res => JSON.parse(res.toString()))
      .catch(this.handleError);
  }

  /**
   * Handle http error response and display in error console
   * 
   * @private
   * @param {(HttpErrorResponse | any)} error 
   * @returns 
   * @memberof RestProvider
   */
  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    if (error instanceof HttpErrorResponse) {
      const err = error.error || JSON.stringify(error);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
