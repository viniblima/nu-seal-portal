import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-raised-button',
  templateUrl: './raised-button.component.html',
  styleUrls: ['./raised-button.component.scss']
})
export class RaisedButtonComponent {
  @Output() onClick = new EventEmitter<void>();

  @Input() type: 'outline' | 'full' | 'text' | 'danger' = 'full';

  @Input() format: 'square' | 'rounded' = 'rounded';

  @Input() disabled: boolean = false;

  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

  click() {
    if (this.disabled) {
      return;
    }
    this.onClick.emit();
  }
}
