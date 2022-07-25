import { Component, h, Host } from "@stencil/core";

@Component({
    tag: 'poc-button',
    shadow: true,
    styleUrl: 'button.css',
})
export class PocButton {

    render() {
        return (
            <Host>
                <button>
                    <span>
                        <slot></slot>
                    </span>
                </button>
            </Host>
        )
    }
}  