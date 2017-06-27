import {Component, OnInit, Input, Output, OnChanges, EventEmitter, OnDestroy} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {NgxSmartModalService} from './ngx-smart-modal.service';

@Component({
  selector: 'ngx-smart-modal',
  templateUrl: './ngx-smart-modal.component.html',
  styleUrls: ['./styles/style.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({transform: 'scale3d(.3, .3, .3)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'scale3d(.0, .0, .0)'}))
      ])
    ])
  ]

})
export class NgxSmartModalComponent implements OnInit, OnDestroy {
  @Input() public closable: boolean = true;
  @Input() public identifier: string;
  @Input() public customClass: string = '';
  @Input() public visible: boolean = false;
  @Input() public backdrop: boolean = true;
  @Output() public visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() public onClose: EventEmitter<any> = new EventEmitter();
  @Output() public onDismiss: EventEmitter<any> = new EventEmitter();
  @Output() public onOpen: EventEmitter<any> = new EventEmitter();

  layerPosition: number = 1041;

  constructor(private ngxSmartModalService: NgxSmartModalService) {
  }

  ngOnInit() {
    this.layerPosition += this.ngxSmartModalService.getModalStackCount();
    this.ngxSmartModalService.addModal({id: this.identifier, modal: this});
  }

  ngOnDestroy() {
    this.ngxSmartModalService.removeModal(this.identifier);
  }

  public open(top?: boolean) {
    if (top) {
      this.layerPosition = this.ngxSmartModalService.getHigherIndex();
    }
    this.visible = true;
    this.onOpen.emit(this);
  }

  public close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.onClose.emit(this);
  }

  public dismiss() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.onDismiss.emit(this)
  }

  public addCustomClass(className: string) {
    if (!this.customClass.length) {
      this.customClass = className;
    }
    else {
      this.customClass += ' ' + className;
    }
  }

  public removeCustomClass(className?: string) {
    if (className) {
      this.customClass = this.customClass.replace(className, '').trim();
    } else {
      this.customClass = '';
    }
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public hasData(): boolean {
    return !!this.ngxSmartModalService.getModalData(this.identifier);
  }

  public setData(data: Object | Array<any> | number | string | boolean): boolean {
    return this.ngxSmartModalService.setModalData(data, this.identifier);
  }

  public getData(): Object {
    return this.ngxSmartModalService.getModalData(this.identifier);
  }

  public removeData(): Array<any> {
    return this.ngxSmartModalService.resetModalData(this.identifier);
  }
}
