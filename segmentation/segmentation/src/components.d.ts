/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface PocBadge {
        "color": string;
        "type": 'error' | 'success';
    }
    interface PocBarchart {
        "perc1": number;
        "perc2": number;
        "perc3": number;
        "value1": number;
        "value2": number;
        "value3": number;
    }
    interface PocButton {
    }
    interface PocPopover {
        "content": string;
    }
    interface PocSegmentation {
        "auth": string;
    }
    interface PocSwitch {
        "leftValue": { label: string, value: any };
        "rightValue": { label: string, value: any };
        "value": any;
    }
    interface PocTooltip {
    }
}
export interface PocSwitchCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLPocSwitchElement;
}
declare global {
    interface HTMLPocBadgeElement extends Components.PocBadge, HTMLStencilElement {
    }
    var HTMLPocBadgeElement: {
        prototype: HTMLPocBadgeElement;
        new (): HTMLPocBadgeElement;
    };
    interface HTMLPocBarchartElement extends Components.PocBarchart, HTMLStencilElement {
    }
    var HTMLPocBarchartElement: {
        prototype: HTMLPocBarchartElement;
        new (): HTMLPocBarchartElement;
    };
    interface HTMLPocButtonElement extends Components.PocButton, HTMLStencilElement {
    }
    var HTMLPocButtonElement: {
        prototype: HTMLPocButtonElement;
        new (): HTMLPocButtonElement;
    };
    interface HTMLPocPopoverElement extends Components.PocPopover, HTMLStencilElement {
    }
    var HTMLPocPopoverElement: {
        prototype: HTMLPocPopoverElement;
        new (): HTMLPocPopoverElement;
    };
    interface HTMLPocSegmentationElement extends Components.PocSegmentation, HTMLStencilElement {
    }
    var HTMLPocSegmentationElement: {
        prototype: HTMLPocSegmentationElement;
        new (): HTMLPocSegmentationElement;
    };
    interface HTMLPocSwitchElement extends Components.PocSwitch, HTMLStencilElement {
    }
    var HTMLPocSwitchElement: {
        prototype: HTMLPocSwitchElement;
        new (): HTMLPocSwitchElement;
    };
    interface HTMLPocTooltipElement extends Components.PocTooltip, HTMLStencilElement {
    }
    var HTMLPocTooltipElement: {
        prototype: HTMLPocTooltipElement;
        new (): HTMLPocTooltipElement;
    };
    interface HTMLElementTagNameMap {
        "poc-badge": HTMLPocBadgeElement;
        "poc-barchart": HTMLPocBarchartElement;
        "poc-button": HTMLPocButtonElement;
        "poc-popover": HTMLPocPopoverElement;
        "poc-segmentation": HTMLPocSegmentationElement;
        "poc-switch": HTMLPocSwitchElement;
        "poc-tooltip": HTMLPocTooltipElement;
    }
}
declare namespace LocalJSX {
    interface PocBadge {
        "color"?: string;
        "type"?: 'error' | 'success';
    }
    interface PocBarchart {
        "perc1"?: number;
        "perc2"?: number;
        "perc3"?: number;
        "value1"?: number;
        "value2"?: number;
        "value3"?: number;
    }
    interface PocButton {
    }
    interface PocPopover {
        "content"?: string;
    }
    interface PocSegmentation {
        "auth"?: string;
    }
    interface PocSwitch {
        "leftValue"?: { label: string, value: any };
        "onToggled"?: (event: PocSwitchCustomEvent<{ label: string, value: any }>) => void;
        "rightValue"?: { label: string, value: any };
        "value"?: any;
    }
    interface PocTooltip {
    }
    interface IntrinsicElements {
        "poc-badge": PocBadge;
        "poc-barchart": PocBarchart;
        "poc-button": PocButton;
        "poc-popover": PocPopover;
        "poc-segmentation": PocSegmentation;
        "poc-switch": PocSwitch;
        "poc-tooltip": PocTooltip;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "poc-badge": LocalJSX.PocBadge & JSXBase.HTMLAttributes<HTMLPocBadgeElement>;
            "poc-barchart": LocalJSX.PocBarchart & JSXBase.HTMLAttributes<HTMLPocBarchartElement>;
            "poc-button": LocalJSX.PocButton & JSXBase.HTMLAttributes<HTMLPocButtonElement>;
            "poc-popover": LocalJSX.PocPopover & JSXBase.HTMLAttributes<HTMLPocPopoverElement>;
            "poc-segmentation": LocalJSX.PocSegmentation & JSXBase.HTMLAttributes<HTMLPocSegmentationElement>;
            "poc-switch": LocalJSX.PocSwitch & JSXBase.HTMLAttributes<HTMLPocSwitchElement>;
            "poc-tooltip": LocalJSX.PocTooltip & JSXBase.HTMLAttributes<HTMLPocTooltipElement>;
        }
    }
}