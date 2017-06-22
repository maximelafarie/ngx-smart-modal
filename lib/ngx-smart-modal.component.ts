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
    @Input() closable: boolean = true;
    @Input() identifier: string;
    @Input() customClass: string = '';
    @Input() visible: boolean = false;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output() onClose: EventEmitter<any> = new EventEmitter(false);
    @Output() onDismiss: EventEmitter<any> = new EventEmitter(false);
    @Output() onOpen: EventEmitter<any> = new EventEmitter(false);

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
        this.onOpen.emit(this);
    }

    public close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
        this.onClose.emit(this);
    }

    public dismiss() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
        this.onDismiss.emit(this)
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
