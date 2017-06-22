import { OnInit, EventEmitter } from '@angular/core';
import { NgxSmartModalService } from "./ngx-smart-modal.service";
export declare class NgxSmartModalComponent implements OnInit {
    private ngxSmartModalService;
    closable: boolean;
    visible: boolean;
    visibleChange: EventEmitter<boolean>;
    constructor(ngxSmartModalService: NgxSmartModalService);
    ngOnInit(): void;
    close(): void;
}
