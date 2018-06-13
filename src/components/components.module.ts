import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmojiPickerComponent } from './emoji-picker/emoji-picker';
import { QuestionsComponent } from './questions/questions';
@NgModule({
	declarations: [
		EmojiPickerComponent,
		QuestionsComponent
	],
	imports: [IonicPageModule.forChild(EmojiPickerComponent)],
	exports: [
		EmojiPickerComponent,
		QuestionsComponent
	]
})
export class ComponentsModule { }
