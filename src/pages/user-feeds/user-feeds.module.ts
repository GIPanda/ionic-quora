import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserFeedsPage } from './user-feeds';

@NgModule({
  declarations: [
    UserFeedsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserFeedsPage),
  ],
})
export class UserFeedsPageModule {}
