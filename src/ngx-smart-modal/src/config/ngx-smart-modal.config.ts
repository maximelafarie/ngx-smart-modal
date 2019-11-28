export const NgxSmartModalConfig = {
    bodyClassOpen: 'dialog-open',
    prefixEvent: 'ngx-smart-modal.'
};

export interface INgxSmartModalOptions {
    closable?: boolean;
    escapable?: boolean;
    dismissable?: boolean;
    customClass?: string;
    backdrop?: boolean;
    force?: boolean;
    hideDelay?: number;
    autostart?: boolean;
    target?: string;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
}
