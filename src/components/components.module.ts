import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmojiPickerComponent } from './emoji-picker/emoji-picker';
import { UserFeedsComponent } from './user-feeds/user-feeds';
@NgModule({
	declarations: [
		EmojiPickerComponent,
		UserFeedsComponent
	],
	imports: [IonicPageModule.forChild(EmojiPickerComponent)],
	exports: [
		EmojiPickerComponent,
		UserFeedsComponent
	]
})
export class ComponentsModule { }
