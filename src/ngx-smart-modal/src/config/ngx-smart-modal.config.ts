export const NgxSmartModalConfig = {
    prefixEvent: 'ngx-smart-modal.',
    bodyClassOpen: 'dialog-open'
};

export interface NgxSmartModalOptions {
    closable?: boolean;
    escapable?: boolean;
    dismissable?: boolean;
    customClass?: string;
    backdrop?: boolean;
    force?: boolean;
    hideDelay?: number;
    autostart?: boolean;
    target?: string;
}
