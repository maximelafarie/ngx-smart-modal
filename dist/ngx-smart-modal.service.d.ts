import { NgxSmartModalComponent } from "./ngx-smart-modal.component";
export declare class NgxSmartModalService {
    modalStack: Array<ModalInstance>;
    modalData: Array<any>;
    constructor();
    /**
     * Add a new modal instance. This step is essential and allows to retrieve any modal at any time.
     * It stores an object that contains the given modal identifier and the modal itself directly in the `modalStack`.
     *
     * @param {ModalInstance} modalInstance The object that contains the given modal identifier and the modal itself.
     * @returns {void} Returns nothing special.
     */
    addModal(modalInstance: ModalInstance): void;
    getModal(id: string): NgxSmartModalComponent;
    getModalStack(): Array<ModalInstance>;
    getOpenedModals(): Array<ModalInstance>;
    getHigherIndex(): number;
    getModalStackCount(): number;
    removeModal(id: string): Array<ModalInstance>;
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
    setModalData(data: Object | Array<any> | number | string | boolean, id: string): boolean;
    /**
     * Retrieve modal data by its identifier.
     *
     * @param {string} id The modal identifier used at creation time.
     * @returns {Object|Array|number|string|boolean|null} Returns the associated modal data.
     */
    getModalData(id: string): Object | Array<any> | number | string | boolean | null;
    /**
     * Retrieve all data associated to any modal.
     *
     * @returns {Array} Returns all modal data.
     */
    getAllModalData(): Array<any>;
    /**
     * Reset the data attached to a given modal.
     *
     * @param {string} id The modal identifier used at creation time.
     * @returns {Array} Returns the removed data.
     */
    resetModalData(id: string): Array<any>;
    /**
     * Reset all the modal data.
     * Use it wisely.
     */
    resetAllModalData(): void;
}
export declare class ModalInstance {
    id: string;
    modal: NgxSmartModalComponent;
}
