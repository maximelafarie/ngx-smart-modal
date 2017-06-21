import {Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, state, style, animate, transition} from '@angular/core';

@Component({
  selector: 'ngx-smart-modal',
  templateUrl: './ngx-smart-modal.component.html',
  styleUrls: ['./styles/style.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]

})
export class NgxSmartModalComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
