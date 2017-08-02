import {Component, OnInit, Input, Output, OnChanges, EventEmitter, OnDestroy, HostListener} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {NgxSmartModalService} from '../services/ngx-smart-modal.service';
import {ModalInstance} from "../services/modal-instance";

@Component({
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
    ],
    selector: 'ngx-smart-modal',
    template: `
        <style>
            .overlay {
                position: fixed;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                overflow-y: auto;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 999;
            }

            .overlay.transparent {
                background-color: transparent;
            }

            body.dialog-open {
                overflow: hidden;
            }

            .dialog {
                visibility: visible;
                position: absolute;
                border-radius: 2px;
                right: 0;
                left: 0;
                top: 20px;
                margin-bottom: 20px;
                margin-right: auto;
                margin-left: auto;
                min-height: 200px;
                width: 90%;
                max-width: 520px;
                background-color: #fff;
                padding: 12px;
                box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);
            }

            @media (min-width: 768px) {
                .dialog {
                    top: 40px;
                    margin-bottom: 40px;
                }
            }

            .dialog__close-btn {
                border: 0;
                background: none;
                color: #2d2d2d;
                position: absolute;
                top: 8px;
                right: 8px;
                font-size: 1.2em;
            }

            .dialog__close-btn:hover {
                cursor: pointer;
            }
        </style>
        <div *ngIf="overlayVisible" class="overlay" [style.z-index]="layerPosition-1"
             [ngClass]="{'transparent':!backdrop}"
             (click)="dismiss($event)">
            <div [@dialog] *ngIf="visible" [style.z-index]="layerPosition" class="dialog" [ngClass]="customClass">
                <ng-content></ng-content>
                <button *ngIf="closable" (click)="close()" aria-label="Close" class="dialog__close-btn">
                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwNS45NDMsNi4wNThjLTguMDc3LTguMDc3LTIxLjE3Mi04LjA3Ny0yOS4yNDksMEw2LjA1OCw0NzYuNjkzYy04LjA3Nyw4LjA3Ny04LjA3NywyMS4xNzIsMCwyOS4yNDkgICAgQzEwLjA5Niw1MDkuOTgyLDE1LjM5LDUxMiwyMC42ODMsNTEyYzUuMjkzLDAsMTAuNTg2LTIuMDE5LDE0LjYyNS02LjA1OUw1MDUuOTQzLDM1LjMwNiAgICBDNTE0LjAxOSwyNy4yMyw1MTQuMDE5LDE0LjEzNSw1MDUuOTQzLDYuMDU4eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwNS45NDIsNDc2LjY5NEwzNS4zMDYsNi4wNTljLTguMDc2LTguMDc3LTIxLjE3Mi04LjA3Ny0yOS4yNDgsMGMtOC4wNzcsOC4wNzYtOC4wNzcsMjEuMTcxLDAsMjkuMjQ4bDQ3MC42MzYsNDcwLjYzNiAgICBjNC4wMzgsNC4wMzksOS4zMzIsNi4wNTgsMTQuNjI1LDYuMDU4YzUuMjkzLDAsMTAuNTg3LTIuMDE5LDE0LjYyNC02LjA1N0M1MTQuMDE4LDQ5Ny44NjYsNTE0LjAxOCw0ODQuNzcxLDUwNS45NDIsNDc2LjY5NHoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
                </button>
            </div>
        </div>
    `
})
export class NgxSmartModalComponent implements OnInit, OnDestroy {
    @Input() public closable: boolean = true;
    @Input() public escapeAble: boolean = true;
    @Input() public identifier: string;
    @Input() public customClass: string = '';
    @Input() public visible: boolean = false;
    @Input() public backdrop: boolean = true;
    @Input() public force: boolean = true;
    @Output() public visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output() public onClose: EventEmitter<any> = new EventEmitter();
    @Output() public onDismiss: EventEmitter<any> = new EventEmitter();
    @Output() public onOpen: EventEmitter<any> = new EventEmitter();

    public layerPosition: number = 1041;
    public overlayVisible: boolean = false;

    constructor(private ngxSmartModalService: NgxSmartModalService) {
    }

    public ngOnInit() {
        this.layerPosition += this.ngxSmartModalService.getModalStackCount();
        this.ngxSmartModalService.addModal({id: this.identifier, modal: this}, this.force);
    }

    public ngOnDestroy() {
        this.ngxSmartModalService.removeModal(this.identifier);
    }

    public open(top?: boolean): void {
        if (top) {
            this.layerPosition = this.ngxSmartModalService.getHigherIndex();
        }
        if (!document.body.classList.contains('dialog-open')) {
            document.body.classList.add('dialog-open');
        }
        this.overlayVisible = true;
        this.visible = true;
        this.onOpen.emit(this);
    }

    public close(): void {
        const me = this;
        this.visible = false;
        this.visibleChange.emit(this.visible);
        this.onClose.emit(this);
        if (document.body.classList.contains('dialog-open')) {
            document.body.classList.remove('dialog-open');
        }
        setTimeout(() => {
            me.overlayVisible = false;
        }, 150);
    }

    public dismiss(e: any): void {
        const me = this;
        if (e.target.classList.contains('overlay')) {
            this.visible = false;
            this.visibleChange.emit(this.visible);
            this.onDismiss.emit(this);
            setTimeout(() => {
                me.overlayVisible = false;
            }, 150);
        }
    }

    public addCustomClass(className: string): void {
        if (!this.customClass.length) {
            this.customClass = className;
        } else {
            this.customClass += ' ' + className;
        }
    }

    public removeCustomClass(className?: string): void {
        if (className) {
            this.customClass = this.customClass.replace(className, '').trim();
        } else {
            this.customClass = '';
        }
    }

    public isVisible(): boolean {
        return this.visible;
    }

    public hasData(): boolean {
        return !!this.ngxSmartModalService.getModalData(this.identifier);
    }

    public setData(data: object | any[] | number | string | boolean): boolean {
        return this.ngxSmartModalService.setModalData(data, this.identifier);
    }

    public getData(): object | any[] | number | string | boolean {
        return this.ngxSmartModalService.getModalData(this.identifier);
    }

    public removeData(): void {
        return this.ngxSmartModalService.resetModalData(this.identifier);
    }

    @HostListener('document:keydown', ['$event'])
    private escapeKeyboardEvent(event: KeyboardEvent) {
        if (this.escapeAble) {
            const x = event.keyCode;
            if (x === 27) {
                this.ngxSmartModalService.closeLatestModal();
            }
        }
    }
}
