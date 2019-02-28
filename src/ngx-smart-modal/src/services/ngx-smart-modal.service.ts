import { Injectable } from '@angular/core';
import { NgxSmartModalComponent } from '../../';
import { ModalInstance } from './modal-instance';

@Injectable()
export class NgxSmartModalService {
  public modalStack: ModalInstance[] = [];

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
      const i: number = this.modalStack.findIndex((o: ModalInstance) => o.id === modalInstance.id);
      if (i > -1) {
        this.modalStack[i].modal = modalInstance.modal;
      } else {
        this.modalStack.push(modalInstance);
      }
      return;
    }
    this.modalStack.push(modalInstance);
  }

  /**
   * Retrieve a modal instance by its identifier.
   *
   * @param id The modal identifier used at creation time.
   */
  public getModal(id: string): NgxSmartModalComponent {
    const i = this.modalStack.find((o: ModalInstance) => o.id === id);

    if (i !== undefined) {
      return i.modal;
    } else {
      throw new Error(`Cannot find modal with identifier ${id}`);
    }
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
  public open(id: string, force = false): void {
    let i;
    if (i = this.get(id)) {
      i.open(force);
    }
  }

  /**
   * Close a given modal
   *
   * @param id The modal identifier used at creation time.
   */
  public close(id: string): void {
    let i;
    if (i = this.get(id)) {
      i.close();
    }
  }

  /**
   * Toggles a given modal
   * If the retrieved modal is opened it closes it, else it opens it.
   *
   * @param id The modal identifier used at creation time.
   * @param force Tell the modal to open top of all other opened modals
   */
  public toggle(id: string, force = false): void {
    let i;
    if (i = this.get(id)) {
      i.toggle(force);
    }
  }

  /**
   * Retrieve all the created modals.
   *
   * @returns an array that contains all modal instances.
   */
  public getModalStack(): ModalInstance[] {
    return this.modalStack;
  }

  /**
   * Retrieve all the opened modals. It looks for all modal instances with their `visible` property set to `true`.
   *
   * @returns an array that contains all the opened modals.
   */
  public getOpenedModals(): ModalInstance[] {
    return this.modalStack.filter((o: ModalInstance) => o.modal.visible);
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
    return Math.max(...this.modalStack.map((o) => o.modal.layerPosition), 1041) + 1;
  }

  /**
   * It gives the number of modal instances. It's helpful to know if the modal stack is empty or not.
   *
   * @returns the number of modal instances.
   */
  public getModalStackCount(): number {
    return this.modalStack.length;
  }

  /**
   * Remove a modal instance from the modal stack.
   *
   * @param id The modal identifier.
   * @returns the removed modal instance.
   */
  public removeModal(id: string): void {
    const i: number = this.modalStack.findIndex((o: any) => o.id === id);
    if (i > -1) {
      this.modalStack.splice(i, 1);
    }
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
  }

  /**
   * Reset the data attached to a given modal.
   *
   * @param id The modal identifier used at creation time.
   * @returns the removed data or false if modal doesn't exist.
   */
  public resetModalData(id: string): any | boolean {
    if (!!this.modalStack.find((o: ModalInstance) => o.id === id)) {
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
}
