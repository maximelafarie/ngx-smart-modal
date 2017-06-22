import { OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { NgxSmartModalService } from "./ngx-smart-modal.service";
export declare class NgxSmartModalComponent implements OnInit, OnDestroy {
    private ngxSmartModalService;
    closable: boolean;
    identifier: string;
    customClass: string;
    visible: boolean;
    backdrop: boolean;
    visibleChange: EventEmitter<boolean>;
    onClose: EventEmitter<any>;
    onDismiss: EventEmitter<any>;
    onOpen: EventEmitter<any>;
    layerPosition: number;
    constructor(ngxSmartModalService: NgxSmartModalService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    open(top?: boolean): void;
    close(): void;
    dismiss(): void;
    addCustomClass(className: string): void;
    isVisible(): boolean;
    hasData(): boolean;
    setData(data: Object | Array<any> | number | string | boolean): boolean;
    getData(): Object;
    removeData(): Array<any>;
}
