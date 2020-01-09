import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  Inject,
  TemplateRef,
  Type,
  PLATFORM_ID
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

import { NgxSmartModalComponent } from '../../src/components/ngx-smart-modal.component';
import { NgxSmartModalConfig, INgxSmartModalOptions } from '../../src/config/ngx-smart-modal.config';
import { NgxSmartModalStackService } from '../../src/services/ngx-smart-modal-stack.service';

import { ModalInstance } from './modal-instance';

export type Content<T> = string | TemplateRef<T> | Type<T>;

@Injectable()
export class NgxSmartModalService {
  private lastElementFocused: any;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _injector: Injector,
    @Inject(DOCUMENT) private _document: any,
    private _modalStack: NgxSmartModalStackService,
    @Inject(PLATFORM_ID) private _platformId: any
  ) {
    this._addEvents();
  }

  /**
   * Add a new modal instance. This step is essential and allows to retrieve any modal at any time.
   * It stores an object that contains the given modal identifier and the modal itself directly in the `modalStack`.
   *
   * @param modalInstance The object that contains the given modal identifier and the modal itself.
   * @param force Optional parameter that forces the overriding of modal instance if it already exists.
   * @returns nothing special.
   */
  public addModal(modalInstance: ModalInstance, force?: boolean): void {
    this._modalStack.addModal(modalInstance, force);
  }

  /**
   * Retrieve a modal instance by its identifier.
   *
   * @param id The modal identifier used at creation time.
   */
  public getModal(id: string): NgxSmartModalComponent {
    return this._modalStack.getModal(id);
  }

  /**
   * Alias of `getModal` to retrieve a modal instance by its identifier.
   *
   * @param id The modal identifier used at creation time.
   */
  public get(id: string): NgxSmartModalComponent {
    return this.getModal(id);
  }

  /**
   * Open a given modal
   *
   * @param id The modal identifier used at creation time.
   * @param force Tell the modal to open top of all other opened modals
   */
  public open(id: string, force = false): boolean {
    return this._openModal(this.get(id), force);
  }

  /**
   * Close a given modal
   *
   * @param id The modal identifier used at creation time.
   */
  public close(id: string): boolean {
    return this._closeModal(this.get(id));
  }

  /**
   * Close all opened modals
   */
  public closeAll(): void {
    this.getOpenedModals().forEach((instance: ModalInstance) => {
      this._closeModal(instance.modal);
    });
  }

  /**
   * Toggles a given modal
   * If the retrieved modal is opened it closes it, else it opens it.
   *
   * @param id The modal identifier used at creation time.
   * @param force Tell the modal to open top of all other opened modals
   */
  public toggle(id: string, force = false): boolean {
    return this._toggleModal(this.get(id), force);
  }

  /**
   * Retrieve all the created modals.
   *
   * @returns an array that contains all modal instances.
   */
  public getModalStack(): ModalInstance[] {
    return this._modalStack.getModalStack();
  }

  /**
   * Retrieve all the opened modals. It looks for all modal instances with their `visible` property set to `true`.
   *
   * @returns an array that contains all the opened modals.
   */
  public getOpenedModals(): ModalInstance[] {
    return this._modalStack.getOpenedModals();
  }

  /**
   * Retrieve the opened modal with highest z-index.
   *
   * @returns the opened modal with highest z-index.
   */
  public getTopOpenedModal(): NgxSmartModalComponent {
    return this._modalStack.getTopOpenedModal();
  }

  /**
   * Get the higher `z-index` value between all the modal instances. It iterates over the `ModalStack` array and
   * calculates a higher value (it takes the highest index value between all the modal instances and adds 1).
   * Use it to make a modal appear foreground.
   *
   * @returns a higher index from all the existing modal instances.
   */
  public getHigherIndex(): number {
    return this._modalStack.getHigherIndex();
  }

  /**
   * It gives the number of modal instances. It's helpful to know if the modal stack is empty or not.
   *
   * @returns the number of modal instances.
   */
  public getModalStackCount(): number {
    return this._modalStack.getModalStackCount();
  }

  /**
   * Remove a modal instance from the modal stack.
   *
   * @param id The modal identifier.
   * @returns the removed modal instance.
   */
  public removeModal(id: string): void {
    this._modalStack.removeModal(id);
  }

  /**
   * Associate data to an identified modal. If the modal isn't already associated to some data, it creates a new
   * entry in the `modalData` array with its `id` and the given `data`. If the modal already has data, it rewrites
   * them with the new ones. Finally if no modal found it returns an error message in the console and false value
   * as method output.
   *
   * @param data The data you want to associate to the modal.
   * @param id The modal identifier.
   * @param force If true, overrides the previous stored data if there was.
   * @returns true if the given modal exists and the process has been tried, either false.
   */
  public setModalData(data: any, id: string, force?: boolean): boolean {
    let i;
    if (i = this.get(id)) {
      i.setData(data, force);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Retrieve modal data by its identifier.
   *
   * @param id The modal identifier used at creation time.
   * @returns the associated modal data.
   */
  public getModalData(id: string): any {
    let i;
    if (i = this.get(id)) {
      return i.getData();
    }

    return null;
  }

  /**
   * Reset the data attached to a given modal.
   *
   * @param id The modal identifier used at creation time.
   * @returns the removed data or false if modal doesn't exist.
   */
  public resetModalData(id: string): any | boolean {
    if (!!this._modalStack.getModalStack().find((o: ModalInstance) => o.id === id)) {
      const removed: any = this.getModal(id).getData();
      this.getModal(id).removeData();
      return removed;
    } else {
      return false;
    }
  }

  /**
   * Close the latest opened modal if it has been declared as escapable
   * Using a debounce system because one or more modals could be listening
   * escape key press event.
   */
  public closeLatestModal(): void {
    this.getTopOpenedModal().close();
  }

  /**
   * Create dynamic NgxSmartModalComponent
   * @param id The modal identifier used at creation time.
   * @param content The modal content ( string, templateRef or Component )
   */
  public create<T>(id: string, content: Content<T>, options: INgxSmartModalOptions = {}) {
    try {
      return this.getModal(id);
    } catch (e) {
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(NgxSmartModalComponent);
      const ngContent = this._resolveNgContent(content);

      const componentRef = componentFactory.create(this._injector, ngContent);

      componentRef.instance.identifier = id;
      componentRef.instance.createFrom = 'service';

      if (typeof options.closable === 'boolean') { componentRef.instance.closable = options.closable; }
      if (typeof options.escapable === 'boolean') { componentRef.instance.escapable = options.escapable; }
      if (typeof options.dismissable === 'boolean') { componentRef.instance.dismissable = options.dismissable; }
      if (typeof options.customClass === 'string') { componentRef.instance.customClass = options.customClass; }
      if (typeof options.backdrop === 'boolean') { componentRef.instance.backdrop = options.backdrop; }
      if (typeof options.force === 'boolean') { componentRef.instance.force = options.force; }
      if (typeof options.hideDelay === 'number') { componentRef.instance.hideDelay = options.hideDelay; }
      if (typeof options.autostart === 'boolean') { componentRef.instance.autostart = options.autostart; }
      if (typeof options.target === 'string') { componentRef.instance.target = options.target; }
      if (typeof options.ariaLabel === 'string') { componentRef.instance.ariaLabel = options.ariaLabel; }
      if (typeof options.ariaLabelledBy === 'string') { componentRef.instance.ariaLabelledBy = options.ariaLabelledBy; }
      if (typeof options.ariaDescribedBy === 'string') { componentRef.instance.ariaDescribedBy = options.ariaDescribedBy; }

      this._appRef.attachView(componentRef.hostView);

      const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      this._document.body.appendChild(domElem);

      return componentRef.instance;
    }
  }

  private _addEvents(): boolean {
    if (!this.isBrowser) {
      return false;
    }

    window.addEventListener(NgxSmartModalConfig.prefixEvent + 'create', ((e: CustomEvent) => {
      this._initModal(e.detail.instance);
    }) as EventListener);

    window.addEventListener(NgxSmartModalConfig.prefixEvent + 'delete', ((e: CustomEvent) => {
      this._deleteModal(e.detail.instance);
    }) as EventListener);

    window.addEventListener(NgxSmartModalConfig.prefixEvent + 'open', ((e: CustomEvent) => {
      this._openModal(e.detail.instance.modal, e.detail.top);
    }) as EventListener);

    window.addEventListener(NgxSmartModalConfig.prefixEvent + 'toggle', ((e: CustomEvent) => {
      this._toggleModal(e.detail.instance.modal, e.detail.top);
    }) as EventListener);

    window.addEventListener(NgxSmartModalConfig.prefixEvent + 'close', ((e: CustomEvent) => {
      this._closeModal(e.detail.instance.modal);
    }) as EventListener);

    window.addEventListener(NgxSmartModalConfig.prefixEvent + 'dismiss', ((e: CustomEvent) => {
      this._dismissModal(e.detail.instance.modal);
    }) as EventListener);

    window.addEventListener('keyup', this._escapeKeyboardEvent);

    return true;
  }

  private _initModal(modalInstance: ModalInstance) {
    modalInstance.modal.layerPosition += this.getModalStackCount();
    this.addModal(modalInstance, modalInstance.modal.force);

    if (modalInstance.modal.autostart) {
      this.open(modalInstance.id);
    }
  }

  private _openModal(modal: NgxSmartModalComponent, top?: boolean): boolean {
    if (modal.visible) {
      return false;
    }

    this.lastElementFocused = document.activeElement;

    if (modal.escapable) {
      window.addEventListener('keyup', this._escapeKeyboardEvent);
    }

    if (modal.backdrop) {
      window.addEventListener('keydown', this._trapFocusModal);
    }

    if (top) {
      modal.layerPosition = this.getHigherIndex();
    }

    modal.addBodyClass();
    modal.overlayVisible = true;
    modal.visible = true;
    modal.onOpen.emit(modal);
    modal.markForCheck();

    setTimeout(() => {
      modal.openedClass = true;

      if (modal.target) {
        modal.targetPlacement();
      }

      modal.nsmDialog.first.nativeElement.setAttribute('role', 'dialog');
      modal.nsmDialog.first.nativeElement.setAttribute('tabIndex', '-1');
      modal.nsmDialog.first.nativeElement.setAttribute('aria-modal', 'true');
      modal.nsmDialog.first.nativeElement.focus();

      modal.markForCheck();
      modal.onOpenFinished.emit(modal);
    });

    return true;
  }

  private _toggleModal(modal: NgxSmartModalComponent, top?: boolean): boolean {
    if (modal.visible) {
      return this._closeModal(modal);
    } else {
      return this._openModal(modal, top);
    }
  }

  private _closeModal(modal: NgxSmartModalComponent): boolean {
    if (!modal.openedClass) {
      return false;
    }

    modal.openedClass = false;
    modal.onClose.emit(modal);
    modal.onAnyCloseEvent.emit(modal);

    if (this.getOpenedModals().length < 2) {
      modal.removeBodyClass();
      window.removeEventListener('keyup', this._escapeKeyboardEvent);
      window.removeEventListener('keydown', this._trapFocusModal);
    }

    setTimeout(() => {
      modal.visibleChange.emit(modal.visible);
      modal.visible = false;
      modal.overlayVisible = false;
      modal.nsmDialog.first.nativeElement.removeAttribute('tabIndex');
      modal.markForCheck();
      modal.onCloseFinished.emit(modal);
      modal.onAnyCloseEventFinished.emit(modal);
      if (!!this.lastElementFocused) {
        this.lastElementFocused.focus();
      }
    }, modal.hideDelay);

    return true;
  }

  private _dismissModal(modal: NgxSmartModalComponent): boolean {
    if (!modal.openedClass) {
      return false;
    }

    modal.openedClass = false;
    modal.onDismiss.emit(modal);
    modal.onAnyCloseEvent.emit(modal);

    if (this.getOpenedModals().length < 2) {
      modal.removeBodyClass();
    }

    setTimeout(() => {
      modal.visible = false;
      modal.visibleChange.emit(modal.visible);
      modal.overlayVisible = false;
      modal.markForCheck();
      modal.onDismissFinished.emit(modal);
      modal.onAnyCloseEventFinished.emit(modal);
    }, modal.hideDelay);

    return true;
  }

  private _deleteModal(modalInstance: ModalInstance) {
    this.removeModal(modalInstance.id);

    if (!this.getModalStack().length) {
      modalInstance.modal.removeBodyClass();
    }
  }

  /**
   * Resolve content according to the types
   * @param content The modal content ( string, templateRef or Component )
   */
  private _resolveNgContent<T>(content: Content<T>) {
    if (typeof content === 'string') {
      const element = this._document.createTextNode(content);
      return [[element]];
    }

    if (content instanceof TemplateRef) {
      const viewRef = content.createEmbeddedView(null as any);

      return [viewRef.rootNodes];
    }

    const factory = this._componentFactoryResolver.resolveComponentFactory(content);
    const componentRef = factory.create(this._injector);

    return [[componentRef.location.nativeElement], [this._document.createTextNode('')]];
  }

  /**
   * Close the latest opened modal if escape key event is emitted
   * @param event The Keyboard Event
   */
  private _escapeKeyboardEvent = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      try {
        const modal = this.getTopOpenedModal();

        if (!modal.escapable) {
          return false;
        }

        modal.onEscape.emit(modal);
        this.closeLatestModal();

        return true;
      } catch (e) {
        return false;
      }
    }

    return false;
  }

  /**
   * Is current platform browser
   */
  private get isBrowser(): boolean {
    return isPlatformBrowser(this._platformId);
  }

  /**
   * While modal is open, the focus stay on it
   * @param event The Keyboar dEvent
   */
  private _trapFocusModal = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      try {
        const modal = this.getTopOpenedModal();

        if (!modal.nsmDialog.first.nativeElement.contains(document.activeElement)) {
          event.preventDefault();
          event.stopPropagation();
          modal.nsmDialog.first.nativeElement.focus();
        }

        return true;
      } catch (e) {
        return false;
      }
    }

    return false;
  }
}
