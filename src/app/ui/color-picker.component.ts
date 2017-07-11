import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})

export class ColorPicker {
  @Input() colors: string[] = [];
  @Output() selectedColor = new EventEmitter();
  isColorPickerVisible: Boolean = false;

  showColorPicker(value: boolean) {
    this.isColorPickerVisible = value;
  }
  selectColor(color: string) {
    this.selectedColor.next(color);
    this.showColorPicker(false);
  }
};
