import { Component, EventEmitter, HostListener, Injectable, Input, NgModule, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
var NgxSmartModalService = (function () {
    function NgxSmartModalService() {
        this.modalStack = [];
        this.modalData = [];
    }
    /**
     * Add a new modal instance. This step is essential and allows to retrieve any modal at any time.
     * It stores an object that contains the given modal identifier and the modal itself directly in the `modalStack`.
     *
     * @param {?} modalInstance
     * @param {?=} force
     * @return {?}
     */
    NgxSmartModalService.prototype.addModal = function (modalInstance, force) {
        if (force) {
            var /** @type {?} */ i = this.modalStack.findIndex(function (o) {
                return o.id === modalInstance.id;
            });
            if (i > -1) {
                this.modalStack[i].modal = modalInstance.modal;
            }
            else {
                this.modalStack.push(modalInstance);
            }
            return;
        }
        this.modalStack.push(modalInstance);
    };
    /**
     * Retrieve a modal instance by its identifier.
     *
     * @param {?} id
     * @return {?}
     */
    NgxSmartModalService.prototype.getModal = function (id) {
        return this.modalStack.filter(function (o) {
            return o.id === id;
        })[0].modal;
    };
    /**
     * Retrieve all the created modals.
     *
     * @return {?}
     */
    NgxSmartModalService.prototype.getModalStack = function () {
        return this.modalStack;
    };
    /**
     * Retrieve all the opened modals. It looks for all modal instances with their `visible` property set to `true`.
     *
     * @return {?}
     */
    NgxSmartModalService.prototype.getOpenedModals = function () {
        var /** @type {?} */ modals = [];
        this.modalStack.forEach(function (o) {
            if (o.modal.visible) {
                modals.push(o);
            }
        });
        return modals;
    };
    /**
     * Get the higher `z-index` value between all the modal instances. It iterates over the `ModalStack` array and
     * calculates a higher value (it takes the highest index value between all the modal instances and adds 1).
     * Use it to make a modal appear foreground.
     *
     * @return {?}
     */
    NgxSmartModalService.prototype.getHigherIndex = function () {
        var /** @type {?} */ index = [];
        var /** @type {?} */ modals = this.getOpenedModals();
        modals.forEach(function (o) {
            index.push(o.modal.layerPosition);
        });
        return Math.max.apply(Math, index) + 1;
    };
    /**
     * It gives the number of modal instances. It's helpful to know if the modal stack is empty or not.
     *
     * @return {?}
     */
    NgxSmartModalService.prototype.getModalStackCount = function () {
        return this.modalStack.length;
    };
    /**
     * Remove a modal instance from the modal stack.
     *
     * @param {?} id
     * @return {?}
     */
    NgxSmartModalService.prototype.removeModal = function (id) {
        var /** @type {?} */ i = this.modalStack.findIndex(function (o) {
            return o.id === id;
        });
        if (i > -1) {
            this.modalStack.splice(i, 1);
        }
    };
    /**
     * Associate data to an identified modal. If the modal isn't already associated to some data, it creates a new
     * entry in the `modalData` array with its `id` and the given `data`. If the modal already has data, it rewrites
     * them with the new ones. Finally if no modal found it returns an error message in the console and false value
     * as method output.
     *
     * @param {?} data
     * @param {?} id
     * @return {?}
     */
    NgxSmartModalService.prototype.setModalData = function (data, id) {
        var _this = this;
        if (!!this.modalStack.find(function (o) {
            return o.id === id;
        })) {
            if (!!this.modalData.find(function (o) {
                return o.id === id;
            })) {
                setTimeout(function () { return _this.modalData[_this.modalData.findIndex(function (o) { return o.id === id; })].data = data; });
            }
            else {
                setTimeout(function () { return _this.modalData.push({ data: data, id: id }); });
            }
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Retrieve modal data by its identifier.
     *
     * @param {?} id
     * @return {?}
     */
    NgxSmartModalService.prototype.getModalData = function (id) {
        return this.modalData.filter(function (o) { return o.id === id; });
    };
    /**
     * Retrieve all data associated to any modal.
     *
     * @return {?}
     */
    NgxSmartModalService.prototype.getAllModalData = function () {
        return this.modalData;
    };
    /**
     * Reset the data attached to a given modal.
     *
     * @param {?} id
     * @return {?}
     */
    NgxSmartModalService.prototype.resetModalData = function (id) {
        var /** @type {?} */ i = this.modalData.findIndex(function (o) {
            return o.id === id;
        });
        if (i > -1) {
            this.modalData.splice(i, 1);
        }
    };
    /**
     * Reset all the modal data.
     * Use it wisely.
     * @return {?}
     */
    NgxSmartModalService.prototype.resetAllModalData = function () {
        this.modalData = [];
    };
    /**
     * Close the latest opened modal if it has been declared as escapeAble
     * Using a debounce system because one or more modals could be listening
     * escape key press event.
     * @return {?}
     */
    NgxSmartModalService.prototype.closeLatestModal = function () {
        var /** @type {?} */ me = this;
        clearTimeout(this.debouncer);
        this.debouncer = setTimeout(function () {
            var /** @type {?} */ tmp;
            me.getOpenedModals().forEach(function (m) {
                if (m.modal.layerPosition > (!!tmp ? tmp.modal.layerPosition : 0 && m.modal.escapeAble)) {
                    tmp = m;
                }
            });
            return !!tmp ? tmp.modal.close() : false;
        }, 100);
    };
    return NgxSmartModalService;
}());
NgxSmartModalService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
NgxSmartModalService.ctorParameters = function () { return []; };
var NgxSmartModalComponent = (function () {
    /**
     * @param {?} ngxSmartModalService
     */
    function NgxSmartModalComponent(ngxSmartModalService) {
        this.ngxSmartModalService = ngxSmartModalService;
        this.closable = true;
        this.escapeAble = true;
        this.customClass = '';
        this.visible = false;
        this.backdrop = true;
        this.force = true;
        this.visibleChange = new EventEmitter();
        this.onClose = new EventEmitter();
        this.onDismiss = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.onEscape = new EventEmitter();
        this.layerPosition = 1041;
        this.overlayVisible = false;
    }
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.ngOnInit = function () {
        this.layerPosition += this.ngxSmartModalService.getModalStackCount();
        this.ngxSmartModalService.addModal({ id: this.identifier, modal: this }, this.force);
    };
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.ngOnDestroy = function () {
        this.ngxSmartModalService.removeModal(this.identifier);
    };
    /**
     * @param {?=} top
     * @return {?}
     */
    NgxSmartModalComponent.prototype.open = function (top) {
        if (top) {
            this.layerPosition = this.ngxSmartModalService.getHigherIndex();
        }
        if (!document.body.classList.contains('dialog-open')) {
            document.body.classList.add('dialog-open');
        }
        this.overlayVisible = true;
        this.visible = true;
        this.onOpen.emit(this);
    };
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.close = function () {
        var /** @type {?} */ me = this;
        this.visible = false;
        this.visibleChange.emit(this.visible);
        this.onClose.emit(this);
        if (document.body.classList.contains('dialog-open')) {
            document.body.classList.remove('dialog-open');
        }
        setTimeout(function () {
            me.overlayVisible = false;
        }, 150);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgxSmartModalComponent.prototype.dismiss = function (e) {
        var /** @type {?} */ me = this;
        if (e.target.classList.contains('overlay')) {
            this.visible = false;
            this.visibleChange.emit(this.visible);
            this.onDismiss.emit(this);
            setTimeout(function () {
                me.overlayVisible = false;
            }, 150);
        }
    };
    /**
     * @param {?} className
     * @return {?}
     */
    NgxSmartModalComponent.prototype.addCustomClass = function (className) {
        if (!this.customClass.length) {
            this.customClass = className;
        }
        else {
            this.customClass += ' ' + className;
        }
    };
    /**
     * @param {?=} className
     * @return {?}
     */
    NgxSmartModalComponent.prototype.removeCustomClass = function (className) {
        if (className) {
            this.customClass = this.customClass.replace(className, '').trim();
        }
        else {
            this.customClass = '';
        }
    };
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.isVisible = function () {
        return this.visible;
    };
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.hasData = function () {
        return !!this.ngxSmartModalService.getModalData(this.identifier);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    NgxSmartModalComponent.prototype.setData = function (data) {
        return this.ngxSmartModalService.setModalData(data, this.identifier);
    };
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.getData = function () {
        return this.ngxSmartModalService.getModalData(this.identifier);
    };
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.removeData = function () {
        return this.ngxSmartModalService.resetModalData(this.identifier);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxSmartModalComponent.prototype.escapeKeyboardEvent = function (event) {
        if (this.escapeAble) {
            var /** @type {?} */ x = event.keyCode;
            if (x === 27) {
                this.onEscape.emit(this);
                this.ngxSmartModalService.closeLatestModal();
            }
        }
    };
    return NgxSmartModalComponent;
}());
NgxSmartModalComponent.decorators = [
    { type: Component, args: [{
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
                ],
                selector: 'ngx-smart-modal',
                template: "\n    <style>\n      .overlay {\n        position: fixed;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        overflow-y: auto;\n        background-color: rgba(0, 0, 0, 0.5);\n        z-index: 999;\n      }\n\n      .overlay.transparent {\n        background-color: transparent;\n      }\n\n      body.dialog-open {\n        overflow: hidden;\n      }\n\n      .dialog {\n        visibility: visible;\n        position: absolute;\n        border-radius: 2px;\n        right: 0;\n        left: 0;\n        top: 20px;\n        margin-bottom: 20px;\n        margin-right: auto;\n        margin-left: auto;\n        min-height: 200px;\n        width: 90%;\n        max-width: 520px;\n        background-color: #fff;\n        padding: 12px;\n        box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n      }\n\n      @media (min-width: 768px) {\n        .dialog {\n          top: 40px;\n          margin-bottom: 40px;\n        }\n      }\n\n      .dialog__close-btn {\n        border: 0;\n        background: none;\n        color: #2d2d2d;\n        position: absolute;\n        top: 8px;\n        right: 8px;\n        font-size: 1.2em;\n      }\n\n      .dialog__close-btn:hover {\n        cursor: pointer;\n      }\n    </style>\n    <div *ngIf=\"overlayVisible\" class=\"overlay\" [style.z-index]=\"layerPosition-1\"\n         [ngClass]=\"{'transparent':!backdrop}\"\n         (click)=\"dismiss($event)\">\n      <div [@dialog] *ngIf=\"visible\" [style.z-index]=\"layerPosition\" class=\"dialog\" [ngClass]=\"customClass\">\n        <ng-content></ng-content>\n        <button *ngIf=\"closable\" (click)=\"close()\" aria-label=\"Close\" class=\"dialog__close-btn\">\n          <img\n            src=\"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwNS45NDMsNi4wNThjLTguMDc3LTguMDc3LTIxLjE3Mi04LjA3Ny0yOS4yNDksMEw2LjA1OCw0NzYuNjkzYy04LjA3Nyw4LjA3Ny04LjA3NywyMS4xNzIsMCwyOS4yNDkgICAgQzEwLjA5Niw1MDkuOTgyLDE1LjM5LDUxMiwyMC42ODMsNTEyYzUuMjkzLDAsMTAuNTg2LTIuMDE5LDE0LjYyNS02LjA1OUw1MDUuOTQzLDM1LjMwNiAgICBDNTE0LjAxOSwyNy4yMyw1MTQuMDE5LDE0LjEzNSw1MDUuOTQzLDYuMDU4eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwNS45NDIsNDc2LjY5NEwzNS4zMDYsNi4wNTljLTguMDc2LTguMDc3LTIxLjE3Mi04LjA3Ny0yOS4yNDgsMGMtOC4wNzcsOC4wNzYtOC4wNzcsMjEuMTcxLDAsMjkuMjQ4bDQ3MC42MzYsNDcwLjYzNiAgICBjNC4wMzgsNC4wMzksOS4zMzIsNi4wNTgsMTQuNjI1LDYuMDU4YzUuMjkzLDAsMTAuNTg3LTIuMDE5LDE0LjYyNC02LjA1N0M1MTQuMDE4LDQ5Ny44NjYsNTE0LjAxOCw0ODQuNzcxLDUwNS45NDIsNDc2LjY5NHoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K\" />\n        </button>\n      </div>\n    </div>\n  "
            },] },
];
/**
 * @nocollapse
 */
NgxSmartModalComponent.ctorParameters = function () { return [
    { type: NgxSmartModalService, },
]; };
NgxSmartModalComponent.propDecorators = {
    'closable': [{ type: Input },],
    'escapeAble': [{ type: Input },],
    'identifier': [{ type: Input },],
    'customClass': [{ type: Input },],
    'visible': [{ type: Input },],
    'backdrop': [{ type: Input },],
    'force': [{ type: Input },],
    'visibleChange': [{ type: Output },],
    'onClose': [{ type: Output },],
    'onDismiss': [{ type: Output },],
    'onOpen': [{ type: Output },],
    'onEscape': [{ type: Output },],
    'escapeKeyboardEvent': [{ type: HostListener, args: ['document:keydown', ['$event'],] },],
};
var NgxSmartModalModule = (function () {
    function NgxSmartModalModule() {
    }
    /**
     * Use in AppModule: new instance of NgxSmartModal.
     * @return {?}
     */
    NgxSmartModalModule.forRoot = function () {
        return {
            ngModule: NgxSmartModalModule,
            providers: [NgxSmartModalService]
        };
    };
    /**
     * Use in features modules with lazy loading: new instance of NgxSmartModal.
     * @return {?}
     */
    NgxSmartModalModule.forChild = function () {
        return {
            ngModule: NgxSmartModalModule,
            providers: [NgxSmartModalService]
        };
    };
    return NgxSmartModalModule;
}());
NgxSmartModalModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgxSmartModalComponent],
                exports: [NgxSmartModalComponent],
                imports: [CommonModule, BrowserModule, BrowserAnimationsModule]
            },] },
];
/**
 * @nocollapse
 */
NgxSmartModalModule.ctorParameters = function () { return []; };
// Public classes.
/**
 * Entry point for all public APIs of the package.
 */
/**
 * Generated bundle index. Do not edit.
 */
export { NgxSmartModalService, NgxSmartModalComponent, NgxSmartModalModule };
//# sourceMappingURL=ngx-smart-modal.es5.js.map
