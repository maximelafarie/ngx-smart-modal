import { Injectable } from '@angular/core';
import { NgxSmartModalComponent } from '../components/ngx-smart-modal.component';
import { ModalInstance } from './modal-instance';

@Injectable()
export class NgxSmartModalService {
  public modalStack: ModalInstance[] = [];
  private debouncer: any;

  /**
   * Add a new modal instance. This step is essential and allows to retrieve any modal at any time.
   * It stores an object that contains the given modal identifier and the modal itself directly in the `modalStack`.
   *
   * @param modalInstance The object that contains the given modal identifier and the modal itself.
   * @param force Optional parameter that forces the overriding of modal instance if it already exists.
   * @returns Returns nothing special.
   */
  public addModal(modalInstance: ModalInstance, force?: boolean): void {
    if (force) {
      const i: number = this.modalStack.findIndex((o: ModalInstance) => {
        return o.id === modalInstance.id;
      });
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
    return this.modalStack.filter((o: any) => {
      return o.id === id;
    })[0].modal;
  }

  /**
   * Retrieve all the created modals.
   *
   * @returns Returns an array that contains all modal instances.
   */
  public getModalStack(): ModalInstance[] {
    return this.modalStack;
  }

  /**
   * Retrieve all the opened modals. It looks for all modal instances with their `visible` property set to `true`.
   *
   * @returns Returns an array that contains all the opened modals.
   */
  public getOpenedModals(): ModalInstance[] {
    const modals: ModalInstance[] = [];
    this.modalStack.forEach((o: ModalInstance) => {
      if (o.modal.visible) {
        modals.push(o);
      }
    });
    return modals;
  }

  /**
   * Get the higher `z-index` value between all the modal instances. It iterates over the `ModalStack` array and
   * calculates a higher value (it takes the highest index value between all the modal instances and adds 1).
   * Use it to make a modal appear foreground.
   *
   * @returns Returns a higher index from all the existing modal instances.
   */
  public getHigherIndex(): number {
    const index: number[] = [1041];
    const modals: ModalInstance[] = this.getModalStack();
    modals.forEach((o: ModalInstance) => {
      index.push(o.modal.layerPosition);
    });
    return Math.max(...index) + 1;
  }

  /**
   * It gives the number of modal instances. It's helpful to know if the modal stack is empty or not.
   *
   * @returns Returns the number of modal instances.
   */
  public getModalStackCount(): number {
    return this.modalStack.length;
  }

  /**
   * Remove a modal instance from the modal stack.
   *
   * @param id The modal identifier.
   * @returns Returns the removed modal instance.
   */
  public removeModal(id: string): void {
    const i: number = this.modalStack.findIndex((o: any) => {
      return o.id === id;
    });
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
   * @returns Returns true if the given modal exists and the process has been tried, either false.
   */
  public setModalData(data: any, id: string, force?: boolean): boolean {
    if (!!this.modalStack.find((o: ModalInstance) => {
        return o.id === id;
      })) {
      this.getModal(id).setData(data, force);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Retrieve modal data by its identifier.
   *
   * @param id The modal identifier used at creation time.
   * @returns Returns the associated modal data.
   */
  public getModalData(id: string): any {
    return this.getModal(id).getData();
  }

  /**
   * Reset the data attached to a given modal.
   *
   * @param id The modal identifier used at creation time.
   * @returns Returns the removed data or false if modal doesn't exist.
   */
  public resetModalData(id: string): any | boolean {
    if (!!this.modalStack.find((o: ModalInstance) => {
        return o.id === id;
      })) {
      const removed: any = this.getModal(id).getData();
      this.getModal(id).removeData();
      return removed;
    } else {
      return false;
    }
  }

  /**
   * Close the latest opened modal if it has been declared as escapeAble
   * Using a debounce system because one or more modals could be listening
   * escape key press event.
   */
  public closeLatestModal(): void {
    const me = this;
    clearTimeout(this.debouncer);
    this.debouncer = setTimeout(() => {
      let tmp: ModalInstance | undefined;
      me.getOpenedModals().forEach((m: ModalInstance) => {
        if (m.modal.layerPosition > (!!tmp ? tmp.modal.layerPosition : 0 && m.modal.escapeAble)) {
          tmp = m;
        }
      });
      return !!tmp ? tmp.modal.close() : false;
    }, 100);
  }
}
