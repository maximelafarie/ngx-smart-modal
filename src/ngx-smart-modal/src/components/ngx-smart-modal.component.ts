import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  QueryList,
  Renderer2,
  Type,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';

import { NgxSmartModalConfig } from '../config/ngx-smart-modal.config';

@Component({
  selector: 'ngx-smart-modal',
  template: `
    <div *ngIf="overlayVisible"
         [style.z-index]="visible ? layerPosition-1 : -1"
         [ngClass]="{'transparent':!backdrop, 'overlay':true, 'nsm-overlay-open':openedClass}"
         (mousedown)="dismiss($event)" #nsmOverlay>
      <div [style.z-index]="visible ? layerPosition : -1"
           [attr.aria-hidden]="openedClass ? false : true"
           [attr.aria-label]="ariaLabel"
           [attr.aria-labelledby]="ariaLabelledBy"
           [attr.aria-describedby]="ariaDescribedBy"
           [ngClass]="['nsm-dialog', customClass, openedClass ? 'nsm-dialog-open': 'nsm-dialog-close']" #nsmDialog>
        <div class="nsm-content" #nsmContent  [class.draggable]="draggable && draggableEdges">
          <div class="nsm-body">
            <ng-template #dynamicContent></ng-template>
            <ng-content></ng-content>

          </div>
          <button type="button" *ngIf="closable" (click)="close()" aria-label="Close" class="nsm-dialog-btn-close">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512"
                 xml:space="preserve" width="16px" height="16px">
              <g>
                <path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249    C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306    C514.019,27.23,514.019,14.135,505.943,6.058z"
                      fill="currentColor"/>
              </g>
              <g>
                <path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636    c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"
                      fill="currentColor"/>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `
})
export class NgxSmartModalComponent implements OnInit, OnDestroy, AfterViewInit {
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
  @Input() public target: string = '';
  @Input() public ariaLabel: string | null = null;
  @Input() public ariaLabelledBy: string | null = null;
  @Input() public ariaDescribedBy: string | null = null;
  @Input() public refocus: boolean = true;
  @Input() public draggable: boolean = false;
  @Input() public draggableEdges: boolean = false;

  @Output() public visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public onClose: EventEmitter<any> = new EventEmitter();
  @Output() public onCloseFinished: EventEmitter<any> = new EventEmitter();
  @Output() public onDismiss: EventEmitter<any> = new EventEmitter();
  @Output() public onDismissFinished: EventEmitter<any> = new EventEmitter();
  @Output() public onAnyCloseEvent: EventEmitter<any> = new EventEmitter();
  @Output() public onAnyCloseEventFinished: EventEmitter<any> = new EventEmitter();
  @Output() public onOpen: EventEmitter<any> = new EventEmitter();
  @Output() public onOpenFinished: EventEmitter<any> = new EventEmitter();
  @Output() public onEscape: EventEmitter<any> = new EventEmitter();
  @Output() public onDataAdded: EventEmitter<any> = new EventEmitter();
  @Output() public onDataRemoved: EventEmitter<any> = new EventEmitter();

  public contentComponent: Type<Component>;
  public layerPosition: number = 1041;
  public overlayVisible: boolean = false;
  public openedClass: boolean = false;

  public createFrom = 'html';

  private _data: any;

  @ViewChildren('nsmContent') private nsmContent: QueryList<ElementRef>;
  @ViewChildren('nsmDialog') public nsmDialog: QueryList<ElementRef>;
  @ViewChildren('nsmOverlay') private nsmOverlay: QueryList<ElementRef>;
  @ViewChildren('dynamicContent', { read: ViewContainerRef }) dynamicContentContainer: QueryList<ViewContainerRef>;

  constructor(
    private _renderer: Renderer2,
    private _changeDetectorRef: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private _document: any,
    @Inject(PLATFORM_ID) private _platformId: any,
  ) { }

  public ngOnInit(): void {
    if (!this.identifier || !this.identifier.length) {
      throw new Error('identifier field isn’t set. Please set one before calling <ngx-smart-modal> in a template.');
    }

    this._sendEvent('create');
  }

  public ngAfterViewInit(): void {
    if (this.contentComponent) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(this.contentComponent);
      this.createDynamicContent(this.dynamicContentContainer, factory);
      this.dynamicContentContainer.changes.subscribe((contentViewContainers: QueryList<ViewContainerRef>) => {
        this.createDynamicContent(contentViewContainers, factory);
      });
    }
  }

  public ngOnDestroy(): void {
    this._sendEvent('delete');
  }

  private positionX = 0;
  private positionY = 0;
  private dragging = false;

  /**
  * Set positionX and positionY to save last position of dragged modal
  */
  public setPosition(posX: number, posY: number) {
    this.positionX = posX;
    this.positionY = posY;
  }

  /**
  * Moves dialog by changing top and left style of modal dialog by offset
  */
  public moveDialog(offsetX: number, offsetY: number) {
    if (!this.nsmDialog.length) {
      return false;
    }
    this.nsmDialog.last.nativeElement.style.top = (this.nsmDialog.last.nativeElement.offsetTop - offsetY) + "px";
    this.nsmDialog.last.nativeElement.style.left = (this.nsmDialog.last.nativeElement.offsetLeft - offsetX) + "px";
    return true;
  }

  /**
  * Listens for mouse down event to initiate dragging of the modal
  */
  @HostListener('document:mousedown', ['$event'])
  startDrag(e: MouseEvent) {
    if (!this.nsmContent.length || !this.draggable) {
      return false;
    }

    let src = e.srcElement as HTMLElement;
    if (src && src.classList.contains('draggable')) {
      if (this.nsmContent.last.nativeElement.contains(src) && !this.dragging) {
        e.preventDefault();

        this.dragging = true;
        this.setPosition(e.clientX, e.clientY);

        return true;
      }
    }

    return false;
  }

  /**
  * Listens for mouse move event and reflects the movement of the mouse to modal position
  */
  @HostListener('document:mousemove', ['$event'])
  elementDrag(e: MouseEvent) {
    if (!this.dragging || !this.nsmDialog.length) {
      return false;
    }
    e.preventDefault();

    const offsetX = this.positionX - e.clientX;
    const offsetY = this.positionY - e.clientY;

    this.moveDialog(offsetX, offsetY);

    this.setPosition(e.clientX, e.clientY);

    return true;
  }


  /**
  * Listens for mouse up event to stop moving dragged modal
  */
  @HostListener('document:mouseup', ['$event'])
  stopDrag() {
    this.dragging = false;
  }

  /**
   * Open the modal instance
   *
   * @param top open the modal top of all other
   * @returns the modal component
   */
  public open(top?: boolean): NgxSmartModalComponent {
    this._sendEvent('open', { top: top });

    return this;
  }

  /**
   * Close the modal instance
   *
   * @returns the modal component
   */
  public close(): NgxSmartModalComponent {
    this._sendEvent('close');

    return this;
  }

  /**
   * Dismiss the modal instance
   *
   * @param e the event sent by the browser
   * @returns the modal component
   */
  public dismiss(e: any): NgxSmartModalComponent {
    if (!this.dismissable || !e.target.classList.contains('overlay')) {
      return this;
    }

    this._sendEvent('dismiss');

    return this;
  }

  /**
   * Toggle visibility of the modal instance
   *
   * @param top open the modal top of all other
   * @returns the modal component
   */
  public toggle(top?: boolean): NgxSmartModalComponent {
    this._sendEvent('toggle', { top: top });

    return this;
  }

  /**
   * Add a custom class to the modal instance
   *
   * @param className the class to add
   * @returns the modal component
   */
  public addCustomClass(className: string): NgxSmartModalComponent {
    if (!this.customClass.length) {
      this.customClass = className;
    } else {
      this.customClass += ' ' + className;
    }

    return this;
  }

  /**
   * Remove a custom class to the modal instance
   *
   * @param className the class to remove
   * @returns the modal component
   */
  public removeCustomClass(className?: string): NgxSmartModalComponent {
    if (className) {
      this.customClass = this.customClass.replace(className, '').trim();
    } else {
      this.customClass = '';
    }

    return this;
  }

  /**
   * Returns the visibility state of the modal instance
   */
  public isVisible(): boolean {
    return this.visible;
  }

  /**
   * Checks if data is attached to the modal instance
   */
  public hasData(): boolean {
    return this._data !== undefined;
  }

  /**
   * Attach data to the modal instance
   *
   * @param data the data to attach
   * @param force override potentially attached data
   * @returns the modal component
   */
  public setData(data: any, force?: boolean): NgxSmartModalComponent {
    if (!this.hasData() || (this.hasData() && force)) {
      this._data = data;
      this.onDataAdded.emit(this._data);
      this.markForCheck();
    }

    return this;
  }

  /**
   * Retrieve the data attached to the modal instance
   */
  public getData(): any {
    return this._data;
  }

  /**
   * Remove the data attached to the modal instance
   *
   * @returns the modal component
   */
  public removeData(): NgxSmartModalComponent {
    this._data = undefined;
    this.onDataRemoved.emit(true);
    this.markForCheck();

    return this;
  }

  /**
   * Add body class modal opened
   *
   * @returns the modal component
   */
  public addBodyClass(): NgxSmartModalComponent {
    this._renderer.addClass(this._document.body, NgxSmartModalConfig.bodyClassOpen);

    return this;
  }

  /**
   * Add body class modal opened
   *
   * @returns the modal component
   */
  public removeBodyClass(): NgxSmartModalComponent {
    this._renderer.removeClass(this._document.body, NgxSmartModalConfig.bodyClassOpen);

    return this;
  }

  public markForCheck() {
    try {
      this._changeDetectorRef.detectChanges();
    } catch (e) {
    }

    this._changeDetectorRef.markForCheck();
  }

  /**
   * Listens for window resize event and recalculates modal instance position if it is element-relative
   */
  @HostListener('window:resize')
  public targetPlacement(): boolean | void {
    if (!this.isBrowser || !this.nsmDialog.length || !this.nsmContent.length || !this.nsmOverlay.length || !this.target) {
      return false;
    }
    const targetElement = this._document.querySelector(this.target);

    if (!targetElement) {
      return false;
    }

    const targetElementRect = targetElement.getBoundingClientRect();
    const bodyRect = this.nsmOverlay.first.nativeElement.getBoundingClientRect();

    const nsmContentRect = this.nsmContent.first.nativeElement.getBoundingClientRect();
    const nsmDialogRect = this.nsmDialog.first.nativeElement.getBoundingClientRect();

    const marginLeft = parseInt(getComputedStyle(this.nsmContent.first.nativeElement).marginLeft as any, 10);
    const marginTop = parseInt(getComputedStyle(this.nsmContent.first.nativeElement).marginTop as any, 10);

    let offsetTop = targetElementRect.top - nsmDialogRect.top - ((nsmContentRect.height - targetElementRect.height) / 2);
    let offsetLeft = targetElementRect.left - nsmDialogRect.left - ((nsmContentRect.width - targetElementRect.width) / 2);

    if (offsetLeft + nsmDialogRect.left + nsmContentRect.width + (marginLeft * 2) > bodyRect.width) {
      offsetLeft = bodyRect.width - (nsmDialogRect.left + nsmContentRect.width) - (marginLeft * 2);
    } else if (offsetLeft + nsmDialogRect.left < 0) {
      offsetLeft = -nsmDialogRect.left;
    }

    if (offsetTop + nsmDialogRect.top + nsmContentRect.height + marginTop > bodyRect.height) {
      offsetTop = bodyRect.height - (nsmDialogRect.top + nsmContentRect.height) - marginTop;
    }

    this._renderer.setStyle(this.nsmContent.first.nativeElement, 'top', (offsetTop < 0 ? 0 : offsetTop) + 'px');
    this._renderer.setStyle(this.nsmContent.first.nativeElement, 'left', offsetLeft + 'px');
  }

  private _sendEvent(name: string, extraData?: any): boolean {
    if (!this.isBrowser) {
      return false;
    }

    const data = {
      extraData: extraData,
      instance: { id: this.identifier, modal: this }
    };

    const event = new CustomEvent(NgxSmartModalConfig.prefixEvent + name, { detail: data });

    return window.dispatchEvent(event);
  }

  /**
   * Is current platform browser
   */
  private get isBrowser(): boolean {
    return isPlatformBrowser(this._platformId);
  }

  /**
   * Creates content inside provided ViewContainerRef
   */
  private createDynamicContent(changes: QueryList<ViewContainerRef>, factory: ComponentFactory<Component>): void {
    changes.forEach((viewContainerRef: ViewContainerRef) => {
      viewContainerRef.clear();
      viewContainerRef.createComponent(factory);
      this.markForCheck();
    });
  }
}
