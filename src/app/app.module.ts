import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HomePage } from '../pages/home/home';
import { DiscoveryPage } from '../pages/discovery/discovery';
import { ChatPage } from '../pages/chat/chat';
import { NotificationPage } from '../pages/notification/notification';
import { MorePage } from '../pages/more/more';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UserPage } from '../pages/user/user';
import { AvatarPage } from '../pages/avatar/avatar';
import { QuestionPage } from '../pages/question/question';
import { DetailPage } from '../pages/detail/detail';
import { TabsPage } from '../pages/tabs/tabs';
import { AnswerPage } from '../pages/answer/answer';
import { ChatDetailPage } from '../pages/chat-detail/chat-detail';
import { UserFeedsPage } from '../pages/user-feeds/user-feeds';
import { ScanQrcodePage } from '../pages/scan-qrcode/scan-qrcode';
import { VersionsPage } from '../pages/versions/versions';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { IonicStorageModule } from '@ionic/storage';

import { ComponentsModule } from '../components/components.module';
import { ChatProvider } from '../providers/chat/chat';
import { RelativeTimePipe } from '../pipes/relative-time/relative-time';
import { SettingsProvider } from '../providers/settings/settings';
import { Camera } from '@ionic-native/camera';
import { AppVersion } from '@ionic-native/app-version';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    LoginPage,
    RegisterPage,
    UserPage,
    AvatarPage, 
    QuestionPage,
    DetailPage,
    TabsPage,
    AnswerPage,
    ChatDetailPage,
    RelativeTimePipe,
    UserFeedsPage,
    ScanQrcodePage,
    VersionsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Back'
    }),
    IonicStorageModule.forRoot(),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    AvatarPage,   
    LoginPage,
    RegisterPage,
    UserPage,
    QuestionPage,
    DetailPage,
    TabsPage,
    AnswerPage,
    ChatDetailPage,
    UserFeedsPage,
    ScanQrcodePage,
    VersionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    ChatProvider,
    SettingsProvider,
    Camera,
    AppVersion
  ]
})
export class AppModule {}
