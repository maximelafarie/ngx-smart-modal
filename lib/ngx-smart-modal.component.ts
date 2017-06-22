import {Component, OnInit, Input, Output, OnChanges, EventEmitter, OnDestroy} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {NgxSmartModalService} from "./ngx-smart-modal.service";

@Component({
    selector: 'ngx-smart-modal',
    templateUrl: './ngx-smart-modal.component.html',
    styleUrls: ['./styles/style.scss'],
    animations: [
        trigger('dialog', [
            transition('void => *', [
                style({transform: 'scale3d(.3, .3, .3)'}),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({transform: 'scale3d(.0, .0, .0)'}))
            ])
        ])
    ]

})
export class NgxSmartModalComponent implements OnInit, OnDestroy {
    @Input() public closable: boolean = true;
    @Input() public identifier: string;
    @Input() public customClass: string = '';
    @Input() public visible: boolean = false;
    @Input() public backdrop: boolean = true;
    @Output() public visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output() public onClose: EventEmitter<any> = new EventEmitter(false);
    @Output() public onDismiss: EventEmitter<any> = new EventEmitter(false);
    @Output() public onOpen: EventEmitter<any> = new EventEmitter(false);

    layerPosition: number = 1041;

    constructor(private ngxSmartModalService: NgxSmartModalService) {
    }

    ngOnInit() {
        this.layerPosition += this.ngxSmartModalService.getModalStackCount();
        this.ngxSmartModalService.addModal({id: this.identifier, modal: this});
    }

    ngOnDestroy() {
        this.ngxSmartModalService.removeModal(this.identifier);
    }

    public open() {
        this.visible = true;
        this.onOpen.emit(undefined);
    }

    public close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
        this.onClose.emit(undefined);
    }

    public dismiss() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
        this.onDismiss.emit(undefined)
    }

    public addCustomClass(className: string) {
        if (!this.customClass.length) {
            this.customClass = className;
        }
        else {
            this.customClass += ' ' + className;
        }
    }
}
