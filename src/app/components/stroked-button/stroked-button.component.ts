import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stroked-button',
  templateUrl: './stroked-button.component.html',
  styleUrls: ['./stroked-button.component.scss']
})
export class StrokedButtonComponent {
  @Output() onClick = new EventEmitter<void>();

  @Input() type: 'outline' | 'full' | 'text' = 'full';

  @Input() format: 'square' | 'rounded' = 'rounded';

  @Input() disabled: boolean = false;

  click() {
    this.onClick.emit();
  }

  get color() {
    const obj: any = {
      "full": "primary",
      "outline": "accent",
      "text": "accent",
    }

    return obj[this.type];
  }
}
