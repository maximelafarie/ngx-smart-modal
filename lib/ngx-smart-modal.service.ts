import {Injectable} from '@angular/core';
import {NgxSmartModalComponent} from "./ngx-smart-modal.component";
import * as _ from "lodash";

@Injectable()
export class NgxSmartModalService {
    modalStack: Array<ModalInstance> = [];
    modalData: Array<any> = [];

    constructor() {
    }

    /**
     * Add a new modal instance. This step is essential and allows to retrieve any modal at any time.
     * It stores an object that contains the given modal identifier and the modal itself directly in the `modalStack`.
     *
     * @param {ModalInstance} modalInstance The object that contains the given modal identifier and the modal itself.
     * @returns {void} Returns nothing special.
     */
    addModal(modalInstance: ModalInstance): void {
        this.modalStack.push(modalInstance);
    }

    getModal(id: string): NgxSmartModalComponent {
        return _.find(this.modalStack, function (o: ModalInstance) {
            return o.id === id;
        }).modal;
    }

    getModalStack(): Array<ModalInstance> {
        return this.modalStack;
    }

    getOpenedModals(): Array<ModalInstance> {
        let modals: Array<ModalInstance> = [];
        _.each(this.modalStack, (o: ModalInstance) => {
            if (o.modal.visible) {
                modals.push(o);
            }
        });
        return modals;
    }

    getHigherIndex(): number {
        let index: Array<number> = [];
        const modals: Array<ModalInstance> = this.getOpenedModals();
        _.each(modals, (o: ModalInstance) => {
            index.push(o.modal.layerPosition);
        });
        return Math.max(...index) + 1;
    }

    getModalStackCount(): number {
        return this.modalStack.length;
    }

    removeModal(id: string): Array<ModalInstance> {
        return _.remove(this.modalStack, function (o: ModalInstance) {
            return o.id === id;
        });
    }

    /**
     * Associate data to an identified modal. If the modal isn't already associated to some data, it creates a new
     * entry in the `modalData` array with its `id` and the given `data`. If the modal already has data, it rewrites
     * them with the new ones. Finally if no modal found it returns an error message in the console and false value
     * as method output.
     *
     * @param {Object | Array | number | string | boolean} data The data you want to associate to the modal.
     * @param {string} id The modal identifier.
     * @returns {boolean} Returns true if data association succeeded, else returns false.
     */
    setModalData(data: Object | Array<any> | number | string | boolean, id: string): boolean {
        if (!!this.modalStack.find((o: ModalInstance) => o.id === id)) {
            if (!!this.modalData.find((o) => o.id === id)) {
                setTimeout(() => this.modalData[this.modalData.findIndex((o) => o.id === id)].data = data);
            } else {
                setTimeout(() => this.modalData.push({data: data, id: id}));
            }
            return true;
        } else {
            console.error('No modal with the id ' + id + 'exist. Please retry.');
            console.warn('To assign data to a modal, it should exists.');
            return false;
        }
    }

    /**
     * Retrieve modal data by its identifier.
     *
     * @param {string} id The modal identifier used at creation time.
     * @returns {Object|Array|number|string|boolean|null} Returns the associated modal data.
     */
    getModalData(id: string): Object | Array<any> | number | string | boolean | null {
        return _.find(this.modalData, (o) => {
            return o.id === id;
        });
    }

    /**
     * Retrieve all data associated to any modal.
     *
     * @returns {Array} Returns all modal data.
     */
    getAllModalData(): Array<any> {
        return this.modalData;
    }

    /**
     * Reset the data attached to a given modal.
     *
     * @param {string} id The modal identifier used at creation time.
     * @returns {Array} Returns the removed data.
     */
    resetModalData(id: string): Array<any> {
        return _.remove(this.modalData, function (o) {
            return o.id === id;
        });
    }

    /**
     * Reset all the modal data.
     * Use it wisely.
     */
    resetAllModalData(): void {
        this.modalData = [];
    }
}
export class ModalInstance {
    id: string;
    modal: NgxSmartModalComponent
}
