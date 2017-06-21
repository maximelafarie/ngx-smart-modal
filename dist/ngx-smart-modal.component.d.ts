import { OnInit, EventEmitter } from '@angular/core';
export declare class NgxSmartModalComponent implements OnInit {
    closable: boolean;
    visible: boolean;
    visibleChange: EventEmitter<boolean>;
    constructor();
    ngOnInit(): void;
    close(): void;
}
