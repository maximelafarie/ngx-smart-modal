import {
  Input,
  Output,
  OnInit,
  OnDestroy,
  Renderer2,
  Component,
  EventEmitter,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import {NgxSmartModalService} from '../services/ngx-smart-modal.service';

@Component({
  selector: 'ngx-smart-modal',
  template: `
    <div *ngIf="overlayVisible" class="overlay {{ openedClass ? 'nsm-overlay-open' : 'nsm-overlay-close'}}"
         [style.z-index]="visible ? layerPosition-1 : -1"
         [ngClass]="{'transparent':!backdrop}"
         (click)="dismiss($event)">
    </div>
    <div [style.z-index]="visible ? layerPosition : -1"
         class="nsm-dialog {{ openedClass ? 'nsm-dialog-open' : 'nsm-dialog-close'}}" [ngClass]="customClass">
      <ng-content></ng-content>
      <button type="button" *ngIf="closable" (click)="close()" aria-label="Close" class="nsm-dialog-btn-close">
        <img
          src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwNS45NDMsNi4wNThjLTguMDc3LTguMDc3LTIxLjE3Mi04LjA3Ny0yOS4yNDksMEw2LjA1OCw0NzYuNjkzYy04LjA3Nyw4LjA3Ny04LjA3NywyMS4xNzIsMCwyOS4yNDkgICAgQzEwLjA5Niw1MDkuOTgyLDE1LjM5LDUxMiwyMC42ODMsNTEyYzUuMjkzLDAsMTAuNTg2LTIuMDE5LDE0LjYyNS02LjA1OUw1MDUuOTQzLDM1LjMwNiAgICBDNTE0LjAxOSwyNy4yMyw1MTQuMDE5LDE0LjEzNSw1MDUuOTQzLDYuMDU4eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwNS45NDIsNDc2LjY5NEwzNS4zMDYsNi4wNTljLTguMDc2LTguMDc3LTIxLjE3Mi04LjA3Ny0yOS4yNDgsMGMtOC4wNzcsOC4wNzYtOC4wNzcsMjEuMTcxLDAsMjkuMjQ4bDQ3MC42MzYsNDcwLjYzNiAgICBjNC4wMzgsNC4wMzksOS4zMzIsNi4wNTgsMTQuNjI1LDYuMDU4YzUuMjkzLDAsMTAuNTg3LTIuMDE5LDE0LjYyNC02LjA1N0M1MTQuMDE4LDQ5Ny44NjYsNTE0LjAxOCw0ODQuNzcxLDUwNS45NDIsNDc2LjY5NHoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"/>
      </button>
    </div>
  `
})
export class NgxSmartModalComponent implements OnInit, OnDestroy {
  @Input() public closable: boolean = true;
  @Input() public escapable: boolean = true;
  @Input() public dismissable: boolean = true;
  @Input() public identifier: string = '';
  @Input() public customClass: string = 'nsm-dialog-animation-fade';
  @Input() public visible: boolean = false;
  @Input() public backdrop: boolean = true;
  @Input() public force: boolean = true;
  @Input() public hideDelay: number = 500;
  @Input() public autostart: boolean = false;

  @Output() public visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public onClose: EventEmitter<any> = new EventEmitter();
  @Output() public onCloseFinished: EventEmitter<any> = new EventEmitter();
  @Output() public onDismiss: EventEmitter<any> = new EventEmitter();
  @Output() public onDismissFinished: EventEmitter<any> = new EventEmitter();
  @Output() public onAnyCloseEvent: EventEmitter<any> = new EventEmitter();
  @Output() public onAnyCloseEventFinished: EventEmitter<any> = new EventEmitter();
  @Output() public onOpen: EventEmitter<any> = new EventEmitter();
  @Output() public onEscape: EventEmitter<any> = new EventEmitter();
  @Output() public onDataAdded: EventEmitter<any> = new EventEmitter();
  @Output() public onDataRemoved: EventEmitter<any> = new EventEmitter();

  public layerPosition: number = 1041;
  public overlayVisible: boolean = false;
  public openedClass: boolean = false;

  private _data: any = null;

  constructor(private _renderer: Renderer2,
              private _changeDetectorRef: ChangeDetectorRef,
              private _ngxSmartModalService: NgxSmartModalService) {
  }

  public ngOnInit() {
    if (!!this.identifier && this.identifier.length) {
      this.layerPosition += this._ngxSmartModalService.getModalStackCount();
      this._ngxSmartModalService.addModal({ id: this.identifier, modal: this }, this.force);

      if (this.autostart) {
        this._ngxSmartModalService.open(this.identifier);
      }
    } else {
      throw new Error('identifier field isn’t set. Please set one before calling <ngx-smart-modal> in a template.');
    }
  }

  public ngOnDestroy() {
    this._ngxSmartModalService.removeModal(this.identifier);
  }

  public open(top?: boolean): void {
    if (top) {
      this.layerPosition = this._ngxSmartModalService.getHigherIndex();
    }

    this._renderer.addClass(document.body, 'dialog-open');
    this.overlayVisible = true;
    this.visible = true;
    this.openedClass = true;
    this.onOpen.emit(this);
  }

  public close(): void {
    const me = this;

    this.openedClass = false;
    this.onClose.emit(this);
    this.onAnyCloseEvent.emit(this);

    if (this._ngxSmartModalService.getOpenedModals().length < 2) {
      this._renderer.removeClass(document.body, 'dialog-open');
    }

    setTimeout(() => {
      me.visibleChange.emit(me.visible);
      me.visible = false;
      me.overlayVisible = false;
      me._changeDetectorRef.markForCheck();
      me.onCloseFinished.emit(me);
      me.onAnyCloseEventFinished.emit(me);
    }, this.hideDelay);
  }

  public dismiss(e: any): void {
    const me = this;

    if (!this.dismissable) {
      return;
    }

    if (e.target.classList.contains('overlay')) {
      this.openedClass = false;
      this.onDismiss.emit(this);
      this.onAnyCloseEvent.emit(this);

      if (this._ngxSmartModalService.getOpenedModals().length < 2) {
        this._renderer.removeClass(document.body, 'dialog-open');
      }

      setTimeout(() => {
        me.visible = false;
        me.visibleChange.emit(me.visible);
        me.overlayVisible = false;
        me._changeDetectorRef.markForCheck();
        me.onDismissFinished.emit(me);
        me.onAnyCloseEventFinished.emit(me);
      }, this.hideDelay);
    }
  }

  public toggle(top?: boolean) {
    if (this.visible) {
      this.close();
    } else {
      this.open(top);
    }
  }

  public addCustomClass(className: string): void {
    if (!this.customClass.length) {
      this.customClass = className;
    } else {
      this.customClass += ' ' + className;
    }
  }

  public removeCustomClass(className?: string): void {
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
    return !!this._data;
  }

  public setData(data: any, force?: boolean): any {
    if (!this._data || (!!this._data && force)) {
      setTimeout(() => {
        this._data = data;
        this.onDataAdded.emit(this._data);
      });
    }
  }

  public getData(): any {
    return this._data;
  }

  public removeData(): void {
    setTimeout(() => {
      this._data = null;
      this.onDataRemoved.emit(true);
    });
  }

  @HostListener('document:keyup', ['$event'])
  public escapeKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27 && this.visible) {
      if (!this.escapable) {
        return false;
      } else {
        this.onEscape.emit(this);
        this._ngxSmartModalService.closeLatestModal();
      }
    }
  }
}
