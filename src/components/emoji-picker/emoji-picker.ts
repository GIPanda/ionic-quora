import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EmojiProvider } from '../../providers/emoji/emoji';

/**
 * Generated class for the EmojiPickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export const EMOJI_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EmojiPickerComponent),
  multi: true
}

@Component({
  selector: 'emoji-picker',
  templateUrl: 'emoji-picker.html',
  providers: [
    EmojiProvider,
    EMOJI_ACCESSOR
  ]
})
export class EmojiPickerComponent implements ControlValueAccessor {

  emojiChunks = [];
  content: string;
  onChanged: Function;
  onTouched; Function

  constructor(private emojiProvider: EmojiProvider) {
    this.emojiChunks = this.emojiProvider.getChunks();
  } 

  writeValue(obj: any): void {
    this.content = obj;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
    this.setValue(this.content)
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setValue(val: any) {
    this.content += val;
    if (this.content) {
      this.onChanged(this.content);
    }
  }

}
