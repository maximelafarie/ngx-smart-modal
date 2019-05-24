import { Injectable } from '@angular/core';

import { NgxSmartModalComponent } from '../../src/components/ngx-smart-modal.component';
import { ModalInstance } from './modal-instance';

@Injectable()
export class NgxSmartModalStackService {
  private _modalStack: ModalInstance[];

  constructor() {
    this._modalStack = [];
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
    if (force) {
      const i: number = this._modalStack.findIndex((o: ModalInstance) => o.id === modalInstance.id);
      if (i > -1) {
        this._modalStack[i].modal = modalInstance.modal;
      } else {
        this._modalStack.push(modalInstance);
      }
      return;
    }
    this._modalStack.push(modalInstance);
  }

  /**
   * Retrieve a modal instance by its identifier.
   *
   * @param id The modal identifier used at creation time.
   */
  public getModal(id: string): NgxSmartModalComponent {
    const i = this._modalStack.find((o: ModalInstance) => o.id === id);

    if (i !== undefined) {
      return i.modal;
    } else {
      throw new Error(`Cannot find modal with identifier ${id}`);
    }
  }

  /**
   * Retrieve all the created modals.
   *
   * @returns an array that contains all modal instances.
   */
  public getModalStack(): ModalInstance[] {
    return this._modalStack;
  }

  /**
   * Retrieve all the opened modals. It looks for all modal instances with their `visible` property set to `true`.
   *
   * @returns an array that contains all the opened modals.
   */
  public getOpenedModals(): ModalInstance[] {
    return this._modalStack.filter((o: ModalInstance) => o.modal.visible);
  }

  /**
   * Retrieve the opened modal with highest z-index.
   *
   * @returns the opened modal with highest z-index.
   */
  public getTopOpenedModal(): NgxSmartModalComponent {
    if (!this.getOpenedModals().length) {
      throw new Error('No modal is opened');
    }

    return this.getOpenedModals()
      .map((o: ModalInstance) => o.modal)
      .reduce((highest, item) => item.layerPosition > highest.layerPosition ? item : highest, this.getOpenedModals()[0].modal);
  }

  /**
   * Get the higher `z-index` value between all the modal instances. It iterates over the `ModalStack` array and
   * calculates a higher value (it takes the highest index value between all the modal instances and adds 1).
   * Use it to make a modal appear foreground.
   *
   * @returns a higher index from all the existing modal instances.
   */
  public getHigherIndex(): number {
    return Math.max(...this._modalStack.map((o) => o.modal.layerPosition), 1041) + 1;
  }

  /**
   * It gives the number of modal instances. It's helpful to know if the modal stack is empty or not.
   *
   * @returns the number of modal instances.
   */
  public getModalStackCount(): number {
    return this._modalStack.length;
  }

  /**
   * Remove a modal instance from the modal stack.
   *
   * @param id The modal identifier.
   * @returns the removed modal instance.
   */
  public removeModal(id: string): void {
    const i: number = this._modalStack.findIndex((o: any) => o.id === id);
    if (i > -1) {
      this._modalStack.splice(i, 1);
    }
  }
}
