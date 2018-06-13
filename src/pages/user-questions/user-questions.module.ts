import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserQuestionsPage } from './user-questions';

@NgModule({
  declarations: [
    UserQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserQuestionsPage),
  ],
})
export class UserQuestionsPageModule {}
